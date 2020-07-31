import React from 'react';
import { TableElement } from "./styles";
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';

function CateogoriesTable({ categories, handleEdit, handleRemove }) {
    return (
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
                            >
                                <Link to={`/cadastro/categoria/${category.id}`} style={{ textDecoration: 'none' }}>
                                    Editar
                                </Link>
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
                                <Link style={{ textDecoration: 'none' }} to={`/category/${category.id}`}>
                                    Gerenciar
                                </Link>
                            </TableElement.Data>
                        </tr>
                    );
                })}
            </tbody>
        </TableElement>
    )
}


CateogoriesTable.propTypes = {
    categories: Proptypes.arrayOf(Proptypes.object).isRequired,
    handleRemove: Proptypes.func.isRequired,
};

export default CateogoriesTable