import React from 'react'
import TemplatePage from '../../components/TemplatePage'
import useForm from '../../hooks/form'
import auth from '../../repositiories/auth'
import Form from '../../components/Form'
import InputField from '../../components/FormFields/InputField'
import PrimaryButton from '../../components/PrimaryButton'


function SignUp() {
    const initialUserData = {
        username: '',
        password: '',
        password2: ''
    }

    const {
        handleChange,
        values: user,
        clearForm
    } = useForm(initialUserData)

    function handleSubmit(event) {
        event.preventDefault()
        const { username, password, password2 } = user
        auth.signUp(username, password, password2)
            .then(data => {
                clearForm()
            })
    }

    return (
        <TemplatePage>
            <h1>Criar conta</h1>
            <Form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    name="username"
                    label="Usuário"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
                <InputField
                    type="password"
                    label="Senha"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <InputField
                    type="password"
                    label="Confirmação de senha"
                    name="password2"
                    value={user.password2}
                    onChange={handleChange}
                    required
                />
                <PrimaryButton type="submit">Cadastrar</PrimaryButton>
            </Form>
        </TemplatePage>
    )
}


export default SignUp