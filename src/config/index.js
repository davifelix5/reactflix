const isLocal = window.location.href.includes('localhost')
const BASE_URL = isLocal ? 'http://localhost:8080/' : 'https://api-reactflix.herokuapp.com/'

export default {
    BASE_URL
}
