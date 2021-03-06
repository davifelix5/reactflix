import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import TemplatePage from '../../components/TemplatePage'
import MessageModal from '../../components/Modals/MessageModal'
import auth from '../../repositiories/auth'
import useForm from '../../hooks/form'
import Form from '../../components/Form'
import InputField from '../../components/FormFields/InputField'
import PrimaryButton from '../../components/PrimaryButton'
import Loader from '../../components/Loader'

function Login() {
    const userData = {
        username: '',
        password: '',
        password2: '',
    }
    const {
        handleChange,
        values: user,
    } = useForm(userData)

    const history = useHistory()

    const [submiting, setSubmiting] = useState(false)

    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    function handleDisable() {
        setMessage('')
        if (!error) history.push('/')
    }

    function handleSubmit(event) {
        event.preventDefault()
        setSubmiting(true)
        const { username, password, password2 } = user
        auth.login(username, password, password2)
            .then(() => {
                setError(false)
                setMessage('Login efetuado com sucesso')
            })
            .catch(err => {
                setError(true)
                setMessage(err.message)
            })
            .finally(() => {
                setSubmiting(false)
            })
    }

    return (
        <TemplatePage>
            {message && <MessageModal message={message} disable={handleDisable} />}
            <h1>Fazer Login</h1>
            {submiting ? (
                <Loader />
            ) : (
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
                )}
        </TemplatePage>
    )
}


export default Login