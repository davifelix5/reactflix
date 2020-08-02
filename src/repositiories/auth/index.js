import config from '../../config'
import { setAuthCookie } from '../../auth/cookies'

const { BASE_URL } = config
const authUrl = `${BASE_URL}auth`

export default {
    async login(username, password) {
        const url = `${authUrl}/login/`
        const method = 'POST'
        const headers = { 'Content-Type': 'application/json' }
        const body = { username, password }
        fetch(url, { method, headers, body: JSON.stringify(body) })
            .then(res => {
                if (res.ok) return res.json()
                throw new Error('Houve um erro')
            })
            .then(data => {
                const { access, refresh } = data
                setAuthCookie(access, refresh)
            })
    },

    async signUp(username, password, password2) {
        const url = `${authUrl}/sign-up/`
        const method = 'POST'
        const headers = { 'Content-Type': 'application/json' }
        const body = { username, password, password2 }
        fetch(url, { method, headers, body: JSON.stringify(body) })
            .then(res => {
                if (res.ok) return res.json()
                throw new Error('Houve um erro')
            })
            .then(data => {
                const { access, refresh } = data
                setAuthCookie(access, refresh)
            })
    },

    async refresh(refresh) {
        const url = `${authUrl}/refresh/`
        const method = 'POST'
        const headers = { 'Content-Type': 'application/json' }
        const body = { refresh }
        fetch(url, { method, headers, body })
            .then(res => {
                if (res.ok) return res.json()
                throw new Error('Houve um erro')
            })
            .then(data => {
                const { access } = data
                setAuthCookie(access, refresh)
            })
    }
}

