import React, { useState, useEffect } from "react";
import TemplatePage from "../../components/TemplatePage";
import Form from "../../components/Form";
import InputField from "../../components/FormFields/InputField";
import Loader from '../../components/Loader'
import { useParams, useHistory } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'
import { ButtonContainer } from './styles'

function RegisterCategory() {
  const initialValues = {
    name: "",
    description: "",
    color: "#000"
  };

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(initialValues);
  const [editingCategory, setEditingCategory] = useState(null);
  const [action, setAction] = useState("Cadastrar");
  const { categoryId } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (editingCategory) setAction("Editar");
    else setAction("Cadastrar");
  }, [editingCategory, setAction]);

  useEffect(() => {
    const URL = "http://localhost:8080/categories/"
    fetch(URL)
      .then(res => res.json())
      .then(data => setCategories([...data]));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const URL = editingCategory ? `http://localhost:8080/categories/${editingCategory.id}` : "http://localhost:8080/categories/"
    const METHOD = editingCategory ? "PUT" : "POST"
    const newCategories = categories.filter(cat => cat !== editingCategory);
    fetch(URL, { method: METHOD, body: JSON.stringify({ ...category }), headers: { "Content-Type": "application/json" } })
      .then(res => res.json())
      .then(() => {
        alert('Categoria cadastrado com sucesso')
        history.push('/')
      })
      .catch(() => alert('Ocorreu um erro'))
    setCategories([...newCategories, category]);
    setCategory(initialValues);
    setEditingCategory(null);
  }

  function handleEdit(category) {
    setCategory(category);
    setEditingCategory(category);
  }

  useEffect(() => {
    if (!categoryId) return
    const URL = `http://localhost:8080/categories/${categoryId}`
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        handleEdit({ ...data })
      })
  }, [categoryId])

  if (categoryId && !editingCategory) {
    return <TemplatePage><Loader /></TemplatePage>
  }

  function changeCategory(e) {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  }

  return (
    <TemplatePage>
      <h1>Cadastro de categoria</h1>
      <Form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="Nome da categoria"
          name="name"
          value={category.name}
          onChange={changeCategory}
          autoComplete="off"
          placeholder=" "
        />
        <InputField
          type="textarea"
          label="Descrição"
          name="description"
          value={category.description}
          onChange={changeCategory}
          autoComplete="off"
          placeholder=" "
        />
        <InputField
          type="color"
          label="Cor"
          name="color"
          value={category.color}
          onChange={changeCategory}
          autoComplete="off"
        />
        <ButtonContainer>
          {editingCategory && <SecondaryButton onClick={() => history.push('/dashboard')}>Cancelar</SecondaryButton>}
          <PrimaryButton type="submit">{action}</PrimaryButton>
        </ButtonContainer>
      </Form>
    </TemplatePage>
  );
}

export default RegisterCategory;
