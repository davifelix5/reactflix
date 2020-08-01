import React, { useState, useEffect } from "react";
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

function RegisterVideo() {
  const defaultVideo = {
    title: "",
    url: "",
    description: "",
    categoryId: 1
  };
  const [categoryOptions, setCategoryOptions] = useState([])
  const [editing, setEditing] = useState(false)
  const [submiting, setSubmiting] = useState(false)
  const {
    values: video,
    setValues: setVideo,
    handleChange: changeVideo,
    clearForm
  } = useForm(defaultVideo)
  const { videoId } = useParams()
  const history = useHistory()

  useEffect(() => {
    categoriesApi.getCategories()
      .then(data => setCategoryOptions([...data]))
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    if (submiting) return
    setSubmiting(true)
    const operation = editing ? videosApi.editVideo : videosApi.registerVideo
    const destination = editing ? `/category/${video.categoryId}` : '/'
    operation({ ...video, categoryId: Number(video.categoryId) })
      .then(() => {
        alert('Operação feita com sucesso!')
        clearForm()
        setEditing(false)
        history.push(destination)
      })
      .catch(() => {
        alert('Ocorreu um erro, tente novamente!')
        setSubmiting(false)
      })
  }

  function handleEdit(video) {
    setEditing(true)
    setVideo({ ...video })
  }

  useEffect(() => {
    if (!videoId) return
    videosApi.getVideo(videoId)
      .then(data => {
        handleEdit(data)
      })
  }, [videoId])


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
              placeholder=" "
              required
            />
            <InputField
              type="text"
              label="Link do vídeo"
              name="url"
              value={video.url}
              onChange={changeVideo}
              autoComplete="off"
              placeholder=" "
              required
            />
            <InputField
              type="textarea"
              label="Descrição"
              name="description"
              value={video.description}
              onChange={changeVideo}
              autoComplete="off"
              placeholder=" "
            />
            <Select
              label="Categoria"
              name="categoryId"
              onChange={changeVideo}
              options={categoryOptions}
              value={video.categoryId}
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
