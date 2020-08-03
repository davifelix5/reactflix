import config from '../../config'
import { setAuthCookie } from '../../auth/cookies'
import { treatError } from '../api'

const { BASE_URL } = config
const authUrl = `${BASE_URL}auth`

export default {
    async login(username, password) {
        const url = `${authUrl}/login/`
        const method = 'POST'
        const headers = { 'Content-Type': 'application/json' }
        const body = { username, password }
        return fetch(url, { method, headers, body: JSON.stringify(body) })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    const { access, refresh } = data
                    setAuthCookie(access, refresh)
                    return
                } else if (res.status === 401) {
                    throw new Error('Credenciais inválidas')
                }
                throw new Error('Houve um erro. Tente novamente mais tarde')
            })
    },

    async signUp(username, password, password2) {
        const url = `${authUrl}/sign-up/`
        const method = 'POST'
        const headers = { 'Content-Type': 'application/json' }
        const body = { username, password, password2 }
        return fetch(url, { method, headers, body: JSON.stringify(body) })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    const { access, refresh } = data
                    setAuthCookie(access, refresh)
                    return
                } else if (res.status === 401) {
                    throw new Error('Credenciais inválidas')
                }
                throw new Error('Houve um erro. Tente novamente mais tarde')
            })
    },

    async refresh(refresh) {
        const url = `${authUrl}/refresh/`
        const method = 'POST'
        const headers = { 'Content-Type': 'application/json' }
        const body = { refresh }
        return fetch(url, { method, headers, body })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    const { access } = data
                    setAuthCookie(access, refresh)
                    return
                }
                throw new Error(treatError(res.status))
            })
    }
}

