const isLocal = window.location.href.includes('localhost')
const BASE_URL = isLocal ? 'http://localhost:8080/' : ''

export default {
    BASE_URL
}
