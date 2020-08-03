import React, { useState, useEffect, useCallback } from "react";
import TemplatePage from "../../components/TemplatePage";
import Form from "../../components/Form";
import InputField from "../../components/FormFields/InputField";
import Loader from '../../components/Loader'
import { useParams, useHistory } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import { ButtonContainer } from './styles'
import categoriesApi from '../../repositiories/categories'
import useForm from '../../hooks/form'
import MessageModal from '../../components/Modals/MessageModal'

function RegisterCategory() {
  const defaultCateogory = {
    name: "",
    description: "",
    color: "#aadd00"
  };
  const {
    values: category,
    setValues: setCategory,
    handleChange: changeCategory,
  } = useForm(defaultCateogory)

  const { categoryId } = useParams()
  const history = useHistory()

  const [action, setAction] = useState("Cadastrar");
  const [submiting, setSubmiting] = useState(false)
  const [error, setError] = useState(false)

  const [editingCategory, setEditingCategory] = useState(null);
  const [destination, setDestination] = useState('')

  const [message, setMessage] = useState('')

  useEffect(() => {
    if (editingCategory) setAction("Editar");
    else setAction("Cadastrar");
  }, [editingCategory, setAction]);

  function handleDisable() {
    setMessage('')
    if (!error) history.push(destination)
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (submiting) return
    setSubmiting(true)
    const operation = editingCategory ? categoriesApi.editCategory : categoriesApi.registerCategory
    const result = editingCategory ? 'editada' : 'cadastrada'
    setDestination(editingCategory ? "/dashboard" : "/")
    operation({ ...category })
      .then(() => {
        setError(false)
        setMessage(`Categoria ${result} com sucesso!`)
      })
      .catch((err) => {
        setError(true)
        setMessage(err.message)
      })
      .finally(() => {
        setSubmiting(false)
      })
  }

  const handleEdit = useCallback((category) => {
    setCategory(category);
    setEditingCategory(category);
  }, [setCategory])

  useEffect(() => {
    if (!categoryId) return
    categoriesApi.getCategory(categoryId)
      .then(data => {
        console.log(data)
        handleEdit({ ...data })
      })
  }, [categoryId, handleEdit])

  if (categoryId && !editingCategory) {
    return <TemplatePage><Loader /></TemplatePage>
  }

  return (
    <TemplatePage>
      <h1>Cadastro de categoria</h1>
      {message && <MessageModal message={message} disable={handleDisable} />}
      {submiting ? (
        <Loader />
      ) : (
          <Form onSubmit={handleSubmit}>
            <InputField
              type="text"
              label="Nome da categoria"
              name="name"
              value={category.name}
              onChange={changeCategory}
              autoComplete="off"
              required
            />
            <InputField
              type="textarea"
              label="Descrição"
              name="description"
              value={category.description}
              onChange={changeCategory}
              autoComplete="off"
              required
            />
            <InputField
              type="color"
              label="Cor"
              name="color"
              value={category.color}
              onChange={changeCategory}
              autoComplete="off"
              required
            />
            <ButtonContainer>
              {editingCategory && <SecondaryButton onClick={() => history.push('/dashboard')}>Cancelar</SecondaryButton>}
              <PrimaryButton type="submit">{action}</PrimaryButton>
            </ButtonContainer>
          </Form>
        )}
    </TemplatePage>
  );
}

export default RegisterCategory;
