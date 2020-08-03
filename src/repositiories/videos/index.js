import config from '../../config'
import getHeaders, { treatError } from '../api'

const { BASE_URL } = config

const videosUrl = BASE_URL + 'videos/'

export default {

    async getVideosByCategory(categoryId) {
        const url = `${BASE_URL}categories/${categoryId}/videos/`
        const data = fetch(url).then(res => {
            if (res.ok) return res.json()
            throw new Error(treatError(res.status))
        })
        return data
    },

    async getVideo(id) {
        const url = videosUrl + id + '/'
        const data = await fetch(url).then(res => {
            if (res.ok) return res.json()
            throw new Error(treatError(res.status))
        })
        return data
    },

    async deleteVideo(id) {
        const url = videosUrl + id + '/'
        const headers = getHeaders()
        const method = 'DELETE'
        const data = fetch(url, { method, headers }).then(res => {
            if (!res.ok) throw new Error(treatError(res.status))
        })
        return data
    },

    async editVideo(body) {
        const { id } = body
        const url = videosUrl + id + '/'
        const method = 'PUT'
        const headers = getHeaders()
        const data = await fetch(url, { method, body: JSON.stringify(body), headers }).then(res => {
            if (res.ok) return res.json()
            throw new Error(treatError(res.status))
        })
        return data
    },

    async registerVideo(body) {
        const url = videosUrl
        const method = 'POST'
        const headers = getHeaders()
        const data = await fetch(url, { method, body: JSON.stringify(body), headers }).then(res => {
            if (res.ok) return res.json()
            throw new Error(treatError(res.status))
        })
        return data
    }

}

