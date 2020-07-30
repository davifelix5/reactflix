import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TemplatePage from "../../components/TemplatePage";
import Form from "../../components/Form";
import Select from "../../components/FormFields/FormSelect";
import InputField from "../../components/FormFields/InputField";
import SubmitButton from "../../components/FormFields/SubmitButton";
import Loader from '../../components/Loader';

function RegisterVideo() {
  const initialValues = {
    title: "",
    url: "",
    description: "",
    categoryId: 1
  };
  const [video, setVideo] = useState(initialValues);
  const [categoryOptions, setCategoryOptions] = useState([])
  const history = useHistory()

  useEffect(() => {
    const URL = "http://localhost:8080/categories"
    fetch(URL)
      .then(res => res.json())
      .then(data => setCategoryOptions([...data]))
  }, [])

  function changeVideo(e) {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const URL = "http://localhost:8080/videos";
    const body = JSON.stringify({ ...video, categoryId: Number(video.categoryId) })
    const headers = { "Content-Type": "application/json" }
    fetch(URL, { method: "POST", body, headers})
      .then(res => res.json())
      .then(() => {
        alert('Vídeo cadastrado com sucesso!')
        history.push('/')
        setVideo(initialValues);
      })
      .catch(() => alert('Ocorreu um erro, tente novamente!'));
    setVideo(initialValues);
  }

  if (!categoryOptions.length) {
    return (
      <TemplatePage buttonPath="/cadastro/categoria" buttonText="Nova Categoria">
        <h1>Novo vídeo</h1>
        <Loader />
      </TemplatePage>
    )
  }

  return (
    <TemplatePage buttonPath="/cadastro/categoria" buttonText="Nova Categoria">
      <h1>Novo vídeo</h1>
      <Form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="Título"
          name="title"
          value={video.title}
          onChange={changeVideo}
          autoComplete="off"
          placeholder=" "
        />
        <InputField
          type="text"
          label="Link do vídeo"
          name="url"
          value={video.url}
          onChange={changeVideo}
          autoComplete="off"
          placeholder=" "
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
        />
        <SubmitButton type="submit">Cadastrar</SubmitButton>
      </Form>
    </TemplatePage>
  );
}

export default RegisterVideo;
