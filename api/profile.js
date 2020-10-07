
import { request } from '@/plugins/request'

export const getProfile = (username) => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`,
    })
}
export const register = (data) => {
    return request({
        method: 'POST',
        url: `/api/users`,
        data: {
            user: data
        }
    })
}

