import React from 'react'
import TemplatePage from '../../components/TemplatePage'
import auth from '../../repositiories/auth'
import useForm from '../../hooks/form'
import Form from '../../components/Form'
import InputField from '../../components/FormFields/InputField'
import PrimaryButton from '../../components/PrimaryButton'

function Login() {
    const userData = {
        username: '',
        password: '',
        password2: '',
    }
    const {
        handleChange,
        values: user,
        clearForm
    } = useForm(userData)

    function handleSubmit(event) {
        event.preventDefault()
        const { username, password, password2 } = user
        auth.login(username, password, password2)
            .then(data => {
                clearForm()
            })
    }

    return (
        <TemplatePage>
            <h1>Fazer Login</h1>
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
                <PrimaryButton type="submit">Login</PrimaryButton>
            </Form>
        </TemplatePage>
    )
}


export default Login