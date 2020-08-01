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
    const [removeConfirmed, setRemoveConfirmed] = useState(false)

    useEffect(() => {
        categoriesApi.getCategories()
            .then(data => setCategories([...data]));
    }, []);

    useEffect(handleRemove, [removeConfirmed, setCategories])

    function handleRemove() {
        if (!removeConfirmed) return
        setCategories(categories.filter(cat => cat !== removingCategory));
        categoriesApi.deleteCategory(removingCategory.id)
            .then(() => {
                setMessage('Vídeo removido com sucesso!')
            })
            .catch(() => {
                setMessage('Houve um erro. Tente novamente')
            })
            .finally(() => {
                setRemovingCategory(null)
                setRemoveConfirmed(false)
            })
    }

    if (!categories.length) {
        return <TemplatePage><Loader /></TemplatePage>
    }

    return (
        <TemplatePage titleMargin={25}>
            {message && <MessageModal message={message} disable={() => setMessage('')} />}
            {removingCategory && (
                <PromptModal
                    message={`Tem certeza que deseja deletar a categoria ${removingCategory.name} `}
                    accept={() => setRemoveConfirmed(true)}
                    reject={() => setRemovingCategory(null)}
                />
            )}
            <DashboardWrapper>
                <h1>Dashboard</h1>
                <CategoriesTable categories={categories} handleRemove={setRemovingCategory} />
                <ButtonContainer>
                    <PrimaryButton
                        as={Link}
                        to='/cadastro/categoria'
                        style={{ textDecoration: 'none' }}
                    >
                        Nova categoria
                    </PrimaryButton>
                    <PrimaryButton
                        as={Link}
                        to='/cadastro/video'
                        style={{ textDecoration: 'none' }}
                    >
                        Novo vídeo
                    </PrimaryButton>
                </ButtonContainer>
            </DashboardWrapper>
        </TemplatePage>
    )
}

export default Dashboard;
