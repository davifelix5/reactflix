import config from '../../config'

const { BASE_URL } = config

const categoriesUrl = BASE_URL + 'categories/'

export default {

    async getCategories() {
        const url = categoriesUrl;
        const data = await fetch(url).then(res => {
            if (res.ok) return res.json()
            throw new Error('Houve um erro')
        })
        return data
    },

    async getCategory(id) {
        const url = categoriesUrl + id
        const data = await fetch(url).then(res => {
            if (res.ok) return res.json()
            throw new Error('Houve um erro!')
        })
        return data
    },

    async getCategoriesWithVideos() {
        const url = categoriesUrl + '?_embed=videos';
        const data = await fetch(url).then(res => {
            if (res.ok) return res.json()
            throw new Error('Houve um erro!')
        })
        return data
    },

    async deleteCategory(id) {
        const url = categoriesUrl + `${id}`
        const method = 'DELETE'
        const data = await fetch(url, { method }).then(res => {
            if (res.ok) return res.json()
            throw new Error('Houve um erro')
        })
        return data
    },

    async editCategory(body) {
        const { id } = body
        const url = categoriesUrl + `${id}`
        const headers = { "Content-Type": "application/json" }
        const method = 'PUT'
        const data = await fetch(url, { method, body: JSON.stringify(body), headers }).then(res => {
            if (res.ok) return res.json()
            throw new Error('Houve um erro')
        })
        return data
    },

    async registerCategory(body) {
        const url = categoriesUrl
        const method = 'POST'
        const headers = { "Content-Type": "application/json" }
        const data = await fetch(url, { method, body: JSON.stringify(body), headers }).then(res => {
            if (res.ok) return res.json()
            throw new Error('Houve um erro')
        })
        return data
    }

}

