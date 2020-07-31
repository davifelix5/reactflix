import React, { useState, useEffect } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import CategoriesTable from '../../components/CategoryTable'
import TemplatePage from '../../components/TemplatePage';
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { ButtonContainer, DashboardWrapper } from './styles'
import categoriesApi from '../../repositiories/categories'

function Dashboard() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoriesApi.getCategories()
            .then(data => setCategories([...data]));
    }, []);

    function handleRemove(category) {
        if (window.confirm("Certeza que deseja deletar?")) {
            setCategories(categories.filter(cat => cat !== category));
            categoriesApi.deleteCategory(category.id)
                .then(() => alert('Categoria deletada com sucesso!'))
        }
    }

    if (!categories.length) {
        return <TemplatePage><Loader /></TemplatePage>
    }

    return (
        <TemplatePage titleMargin={25}>
            <DashboardWrapper>
                <h1>Dashboard</h1>
                <CategoriesTable categories={categories} handleRemove={handleRemove} />
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
