import React, { useState, useEffect } from "react";
import TemplatePage from "../../components/TemplatePage";
import { TableElement } from "./styles";
import Form from "../../components/Form";
import InputField from "../../components/FormFields/InputField";
import SubmitButton from "../../components/FormFields/SubmitButton";
import Loader from '../../components/Loader'
import { Link } from "react-router-dom"

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
      .then(data => console.log(data))
    setCategories([...newCategories, category]);
    setCategory(initialValues);
    setEditingCategory(null);
  }

  function handleEdit(category) {
    setCategory(category);
    setEditingCategory(category);
  }

  function handleRemove(category) {
    if (window.confirm("Certeza que deseja deletar?")) {
      setCategories(categories.filter(cat => cat !== category));
      const URL = `http://localhost:8080/categories/${category.id}`
      const METHOD = "DELETE"
      fetch(URL, { method: METHOD })
    }
  }

  function changeCategory(e) {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  }

  return (
    <TemplatePage buttonText="Novo vídeo" buttonPath="/cadastro/video">
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
        <SubmitButton type="submit">{action}</SubmitButton>
      </Form>
      {categories.length > 0 ? (
        <TableElement>
          <thead>
            <tr>
              <TableElement.Data as="th">Nome</TableElement.Data >
              <TableElement.Data as="th" hideOnMobile>Descrição</TableElement.Data >
              <TableElement.Data as="th" isAction>Editar</TableElement.Data >
              <TableElement.Data as="th" isAction>Remover</TableElement.Data >
              <TableElement.Data as="th" isAction>Vídeos</TableElement.Data >
            </tr>
          </thead>
          <tbody>
            {categories.map(category => {
              return (
                <tr key={category.id}>
                  <TableElement.Data>{category.name}</TableElement.Data>
                  <TableElement.Data hideOnMobile>{category.description}</TableElement.Data>
                  <TableElement.Data
                    isAction
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(category)}
                  >
                    Editar
                  </TableElement.Data>
                  <TableElement.Data
                    isAction
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemove(category)}
                  >
                    Remover
                  </TableElement.Data>
                  <TableElement.Data
                    isAction
                    style={{ cursor: "pointer" }}
                  >
                    <Link style={{ textDecoration: 'none' }} to={`/category/${category.id}`}>Gerenciar</Link>
                  </TableElement.Data>
                </tr>
              );
            })}
          </tbody>
        </TableElement>
      ) : <Loader />}
    </TemplatePage>
  );
}

export default RegisterCategory;
