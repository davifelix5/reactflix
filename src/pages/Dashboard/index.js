import React, { useState, useEffect } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import CategoriesTable from '../../components/CategoriesTable'
import TemplatePage from '../../components/TemplatePage';
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { ButtonContainer, DashboardWrapper } from './styles'
import categoriesApi from '../../repositiories/categories'
import MessageModal from '../../components/Modals/MessageModal'
import PromptModal from '../../components/Modals/PromptModal'

function Dashboard() {
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('')
    const [removingCategory, setRemovingCategory] = useState(null)
    const [searching, setSearching] = useState(true)

    useEffect(() => {
        categoriesApi.getCategories()
            .then(data => {
                setCategories([...data])
                setSearching(false)
            });
    }, []);

    function handleRemove() {
        categoriesApi.deleteCategory(removingCategory.id)
            .then(() => {
                setCategories(categories.filter(cat => cat !== removingCategory));
                setMessage('Vídeo removido com sucesso!')
            })
            .catch((err) => {
                setMessage(err.message)
            })
            .finally(() => {
                setRemovingCategory(null)
            })
    }

    if (!categories.length && searching) {
        return <TemplatePage><Loader /></TemplatePage>
    }

    return (
        <TemplatePage titleMargin={25}>
            {message && <MessageModal message={message} disable={() => setMessage('')} />}
            {removingCategory && (
                <PromptModal
                    message={`Tem certeza que deseja deletar a categoria ${removingCategory.name} `}
                    accept={() => handleRemove()}
                    reject={() => setRemovingCategory(null)}
                />
            )}
            <DashboardWrapper>
                <h1>Dashboard</h1>
                {categories.length ? (
                    <CategoriesTable categories={categories} handleRemove={setRemovingCategory} />
                ) : <p style={{ alignSelf: 'center', marginBottom: 15 }}> Não há categorias cadastradas </p>}
                <ButtonContainer>
                    <PrimaryButton
                        as={Link}
                        to='/cadastro/categoria'
                        style={{ textDecoration: 'none' }}
                    >
                        Nova categoria
                    </PrimaryButton>
                    {categories.length ? (
                        <PrimaryButton
                            as={Link}
                            to='/cadastro/video'
                            style={{ textDecoration: 'none' }}
                        >
                            Novo vídeo
                        </PrimaryButton>
                    ) : null}
                </ButtonContainer>
            </DashboardWrapper>
        </TemplatePage>
    )
}

export default Dashboard;
