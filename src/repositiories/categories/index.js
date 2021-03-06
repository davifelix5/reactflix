import config from '../../config'
import getHeaders, { treatError } from '../api/'

const { BASE_URL } = config

const categoriesUrl = BASE_URL + 'categories/'

export default {

    async getCategories() {
        const url = categoriesUrl;
        const data = await fetch(url).then(res => {
            if (res.ok) return res.json()
            throw new Error(treatError(res.status))
        })
        return data
    },

    async getCategory(id) {
        const url = categoriesUrl + id + '/'
        const data = await fetch(url).then(res => {
            if (res.ok) return res.json()
            throw new Error(treatError(res.status))
        })
        return data
    },

    async getCategoriesWithVideos() {
        const url = categoriesUrl + 'videos/';
        const data = await fetch(url).then(res => {
            if (res.ok) return res.json()
            throw new Error(treatError(res.status))
        })
        return data
    },

    async deleteCategory(id) {
        const url = categoriesUrl + `${id}/`
        const method = 'DELETE'
        const headers = getHeaders()
        const data = await fetch(url, { method, headers }).then(res => {
            if (!res.ok) throw new Error(treatError(res.status))
        })
        return data
    },

    async editCategory(body) {
        const { id } = body
        const url = categoriesUrl + `${id}/`
        const headers = getHeaders()
        const method = 'PUT'
        const data = await fetch(url, { method, body: JSON.stringify(body), headers }).then(res => {
            if (res.ok) return res.json()
            throw new Error(treatError(res.status))
        })
        return data
    },

    async registerCategory(body) {
        const url = categoriesUrl
        const method = 'POST'
        const headers = getHeaders()
        const data = await fetch(url, { method, body: JSON.stringify(body), headers }).then(res => {
            if (res.ok) return res.json()
            throw new Error(treatError(res.status))
        })
        return data
    }

}

