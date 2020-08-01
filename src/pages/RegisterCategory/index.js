import React, { useState, useEffect } from "react";
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

function RegisterCategory() {
  const defaultCateogory = {
    name: "",
    description: "",
    color: "#aadd00"
  };

  const [editingCategory, setEditingCategory] = useState(null);
  const [action, setAction] = useState("Cadastrar");
  const [submiting, setSubmiting] = useState(false)
  const {
    values: category,
    setValues: setCategory,
    handleChange: changeCategory,
    clearForm,
  } = useForm(defaultCateogory)
  const { categoryId } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (editingCategory) setAction("Editar");
    else setAction("Cadastrar");
  }, [editingCategory, setAction]);


  function handleSubmit(event) {
    event.preventDefault();
    if (submiting) return
    setSubmiting(true)
    const operation = editingCategory ? categoriesApi.editCategory : categoriesApi.registerCategory
    const destination = editingCategory ? "/dashboard" : "/"
    operation({ ...category })
      .then(() => {
        alert('Operação feita com sucesso')
        history.push(destination)
        clearForm();
      })
      .catch(() => alert('Ocorreu um erro'))
      .finally(() => setSubmiting(false))
  }

  function handleEdit(category) {
    setCategory(category);
    setEditingCategory(category);
  }

  useEffect(() => {
    if (!categoryId) return
    categoriesApi.getCategory(categoryId)
      .then(data => {
        console.log(data)
        handleEdit({ ...data })
      })
  }, [categoryId])

  if (categoryId && !editingCategory) {
    return <TemplatePage><Loader /></TemplatePage>
  }

  return (
    <TemplatePage>
      <h1>Cadastro de categoria</h1>
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
              placeholder=" "
              required
            />
            <InputField
              type="textarea"
              label="Descrição"
              name="description"
              value={category.description}
              onChange={changeCategory}
              autoComplete="off"
              placeholder=" "
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
