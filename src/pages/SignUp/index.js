import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import TemplatePage from '../../components/TemplatePage'
import MessageModal from '../../components/Modals/MessageModal'
import useForm from '../../hooks/form'
import auth from '../../repositiories/auth'
import Form from '../../components/Form'
import InputField from '../../components/FormFields/InputField'
import PrimaryButton from '../../components/PrimaryButton'
import Loader from '../../components/Loader'


function SignUp() {
    const initialUserData = {
        username: '',
        password: '',
        password2: ''
    }
    const {
        handleChange,
        values: user,
    } = useForm(initialUserData)

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
        auth.signUp(username, password, password2)
            .then(() => {
                setMessage('Cadastro efetuado com sucesso!')
                setError(false)
            })
            .catch(err => {
                setMessage(err.message)
                setError(true)
            })
            .finally(() => {
                setSubmiting(false)
            })

    }

    return (
        <TemplatePage>
            {message && <MessageModal message={message} disable={handleDisable} />}
            <h1>Criar conta</h1>
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
                )}
        </TemplatePage>
    )
}


export default SignUp