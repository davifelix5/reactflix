import React, { useState, useEffect } from 'react';
import TemplatePage from '../../components/TemplatePage';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { VideoList, VideoElement, Button } from './styles';
import { Link } from 'react-router-dom'

function getYouTubeId(youtubeURL) {
    return youtubeURL.replace(
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
        "$7"
    );
}

function getYoutubeImage(youtubeURL) {
    return `https://img.youtube.com/vi/${getYouTubeId(youtubeURL)}/hqdefault.jpg`;
}


function ManageVideos() {
    const { categoryId } = useParams()
    const [category, setCategory] = useState({})
    const [videos, setVideos] = useState([])
    const [videosNotFound, setVideosNotFound] = useState(false)
    const [categoryNotFound, setCategoryNotFound] = useState(false)

    useEffect(() => {
        const URL = `http://localhost:8080/categories/${categoryId}`
        fetch(URL)
            .then(res => {
                if (res.status === 404) setCategoryNotFound(true)
                else return res.json()
            })
            .then(data => {
                setCategory(data)
            })
    }, [categoryId])

    useEffect(() => {
        const URL = `http://localhost:8080/categories/${categoryId}/videos`
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                data.length > 0 ? setVideos(data) : setVideosNotFound(true)
            })
    }, [categoryId])

    function handleDelete(videoId) {
        if (!window.confirm('Tem certeza que deseja deltar esse vídeo?')) return
        const URL = `http://localhost:8080/videos/${videoId}`
        const method = "DELETE"
        setVideos(videos.filter(video => video.id !== videoId))
        fetch(URL, { method })
            .then(() => {
                alert('Video deletado com sucesso')
            })
            .catch(() => {
                alert('Houve um erro. Tente novamente')
            })
    }

    if (!videos.length) {
        return (
            <TemplatePage>
                <Loader />
            </TemplatePage>
        )
    }

    if (categoryNotFound) {
        return <TemplatePage><h1>404: Categoria não existe</h1></TemplatePage>
    } else if (videosNotFound || (!categoryNotFound && !videos.length)) {
        return <TemplatePage><h1>404: Não há vídeos registrados</h1></TemplatePage>
    }


    return (
        <TemplatePage buttonText="Gerenciar vídeos" buttonPath="/dashboard">
            <h1>Vídeo da categoria {category.name}</h1>
            {videos ? (
                <VideoList>
                    {videos.map(video => (
                        <VideoElement key={video.id} color={category.color}>
                            <VideoElement.Image color={category.color} url={getYoutubeImage(video.url)}>
                            </VideoElement.Image>
                            <VideoElement.Info>
                                <VideoElement.Info.Title>{video.title}</VideoElement.Info.Title>
                                <VideoElement.Info.Desc>{video.description}</VideoElement.Info.Desc>
                            </VideoElement.Info>
                            <VideoElement.Actions>
                                <Button type="delete" onClick={() => handleDelete(video.id)}>Deletar</Button>
                                <Button as="a" type="watch" href={video.url} target="_blank">Assistir</Button>
                                <Button as={Link} type="edit" to={`/cadastro/video/${video.id}`}>Editar</Button>
                            </VideoElement.Actions>
                        </VideoElement>
                    ))}
                </VideoList>
            ) : <Loader />}
        </TemplatePage>
    )
}

export default ManageVideos