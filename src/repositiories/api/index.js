import { getTokens } from '../../auth/cookies'

export default function getHeaders() {
    const { access } = getTokens()
    return {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json'
    }
}

export function treatError(status) {
    switch (status) {
        case 401: {
            return 'Você não tem autorização!'
        }
        case 400: {
            return 'Dados inválidos'
        }
        default: {
            return 'Ocorreu um erro! Tente novamente mais tarde'
        }
    }
}