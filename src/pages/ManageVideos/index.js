import React, { useState, useEffect } from 'react';
import TemplatePage from '../../components/TemplatePage';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { VideoList, VideoElement, Button } from './styles';
import { Link } from 'react-router-dom'
import categoriesApi from '../../repositiories/categories'
import videosApi from '../../repositiories/videos'
import MessageModal from '../../components/Modals/MessageModal'
import PromptModal from '../../components/Modals/PromptModal'

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
    const [message, setMessage] = useState('')
    const [videoToRemove, setVideoToRemove] = useState(null)
    const [allVideosRemoved, setAllVideosRemoved] = useState(false)

    useEffect(() => {
        categoriesApi.getCategory(categoryId)
            .then(data => {
                setCategory(data)
            })
            .catch(() => setCategoryNotFound(true))
    }, [categoryId])

    useEffect(() => {
        videosApi.getVideosByCategory(categoryId)
            .then(data => {
                if (data.length > 0) setVideos(data)
                else setVideosNotFound(true)
            })
    }, [categoryId])

    function handleDelete() {
        videosApi.deleteVideo(videoToRemove.id)
            .then(() => {
                setVideos(videos.filter(video => video.id !== videoToRemove.id))
                setMessage('Video deletado com sucesso')
            })
            .catch(() => {
                setMessage('Houve um erro. Tente novamente')
            })
            .finally(() => {
                setVideoToRemove(null)
            })
        if (videos.length === 1) setAllVideosRemoved(true)
    }

    if (categoryNotFound) {
        return <TemplatePage><h1>404: Categoria não existe</h1></TemplatePage>
    }

    if (videosNotFound) {
        return <TemplatePage><h1>404: Não há vídeos registrados</h1></TemplatePage>
    }

    if (!videos.length && !allVideosRemoved) {
        return (
            <TemplatePage>
                <Loader />
            </TemplatePage>
        )
    }
    return (
        <TemplatePage buttonText="Gerenciar vídeos" buttonPath="/dashboard">
            <h1>Vídeo da categoria {category.name}</h1>
            {message && <MessageModal message={message} disable={() => setMessage('')} />}
            {videoToRemove && (
                <PromptModal
                    message={`Tem certeza que deseja remover o vídeo "${videoToRemove.title}"?`}
                    accept={handleDelete}
                    reject={() => { setVideoToRemove(null) }}
                />
            )}
            {videos.length ? (
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
                                <Button type="delete" onClick={() => setVideoToRemove(video)}>Deletar</Button>
                                <Button as="a" type="watch" href={video.url} target="_blank">Assistir</Button>
                                <Button as={Link} type="edit" to={`/cadastro/video/${video.id}`}>Editar</Button>
                            </VideoElement.Actions>
                        </VideoElement>
                    ))}
                </VideoList>
            ) : <p style={{ alignSelf: 'center' }}>Não há videos registrados </p>}
        </TemplatePage>
    )
}

export default ManageVideos