import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import TemplatePage from "../../components/TemplatePage";
import Form from "../../components/Form";
import Select from "../../components/FormFields/FormSelect";
import InputField from "../../components/FormFields/InputField";
import Loader from '../../components/Loader';
import { ButtonContainer } from './styles'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import videosApi from '../../repositiories/videos'
import categoriesApi from '../../repositiories/categories'
import useForm from '../../hooks/form'
import MessageModal from '../../components/Modals/MessageModal'

function RegisterVideo() {
  const [categoryOptions, setCategoryOptions] = useState([])
  const defaultVideo = {
    title: "",
    url: "",
    description: "",
    category: 1
  };
  const {
    values: video,
    setValues: setVideo,
    handleChange: changeVideo,
  } = useForm(defaultVideo)

  const { videoId } = useParams()
  const history = useHistory()

  const [editing, setEditing] = useState(false)
  const [submiting, setSubmiting] = useState(false)
  const [error, setError] = useState(false)

  const [message, setMessage] = useState('')
  const [destination, setDestination] = useState('')

  useEffect(() => {
    categoriesApi.getCategories()
      .then(data => {
        const [firstCategory] = data
        setCategoryOptions([...data])
        setVideo(video => {
          return { ...video, category: firstCategory.id }
        })
      })
  }, [setVideo])

  function handleDisable() {
    setMessage('')
    if (!error) history.push(destination)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (submiting) return
    setSubmiting(true)
    const operation = editing ? videosApi.editVideo : videosApi.registerVideo
    const result = editing ? 'editado' : 'cadastrado'
    setDestination(editing ? `/category/${video.category}` : '/')
    operation({ ...video, category: Number(video.category) })
      .then(() => {
        setMessage(`Video ${result} com sucessso`)
        setError(false)
        setEditing(false)
      })
      .catch((err) => {
        setMessage(err.message)
        setError(true)
      })
      .finally(() => {
        setSubmiting(false)
      })
  }

  const handleEdit = useCallback((category) => {
    setVideo(category);
    setEditing(category);
  }, [setVideo])

  useEffect(() => {
    if (!videoId) return
    videosApi.getVideo(videoId)
      .then(data => {
        handleEdit(data)
      })
  }, [videoId, handleEdit])

  if (!categoryOptions.length || (editing && !video)) {
    return (
      <TemplatePage buttonPath="/cadastro/categoria" buttonText="Nova Categoria">
        <h1>Novo vídeo</h1>
        <Loader />
      </TemplatePage>
    )
  }

  return (
    <TemplatePage buttonPath="/cadastro/categoria" buttonText="Nova Categoria">

      <h1>{editing ? "Alterar vídeo" : "Novo vídeo"}</h1>
      {message && <MessageModal message={message} disable={handleDisable} />}
      {submiting ? (
        <Loader />
      ) : (
          <Form onSubmit={handleSubmit}>
            <InputField
              type="text"
              label="Título"
              name="title"
              value={video.title}
              onChange={changeVideo}
              autoComplete="off"
              required
            />
            <InputField
              type="text"
              label="Link do vídeo"
              name="url"
              value={video.url}
              onChange={changeVideo}
              autoComplete="off"
              required
            />
            <InputField
              type="textarea"
              label="Descrição"
              name="description"
              value={video.description}
              onChange={changeVideo}
              autoComplete="off"
            />
            <Select
              label="Categoria"
              name="category"
              onChange={changeVideo}
              options={categoryOptions}
              value={video.category}
            />
            <ButtonContainer>
              {editing && <SecondaryButton onClick={() => history.push(`/category/${video.categoryId}`)}>Cancelar</SecondaryButton>}
              <PrimaryButton type="submit">{editing ? "Editar" : "Cadastrar"}</PrimaryButton>
            </ButtonContainer>
          </Form>
        )}
    </TemplatePage>
  );
}

export default RegisterVideo;
