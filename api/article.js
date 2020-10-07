
import { request } from '@/plugins/request'

export const getArticles = (params) => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}
export const getTags = (params) => {
    return request({
        method: 'GET',
        url: '/api/tags',
        params
    })
}
export const getYourFeed = (params) => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params,
    })
}
export const addFavorite = (slug) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`,
    })
}
export const deleteFavorite = (slug) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`,
    })
}
export const getDetail = (slug) => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`,
    })
}
export const getComments = (slug) => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`,
    })
}
export const removeComment = (slug, id) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/comments/${id}`,
    })
}
export const addComment = (slug, data) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    })
}

export const addFollow = (username) => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`,
    })
}

export const deleteFollow = (username) => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`,
    })
}
export const createArticle = (data) => {
    return request({
        method: 'POST',
        url: `/api/articles`,
        data
    })
}
export const updateArticle = (slug, data) => {
    return request({
        method: 'PUT',
        url: `/api/articles/${slug}`,
        data
    })
}
export const deleteArticle = (slug) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`,
    })
}
