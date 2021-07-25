import axios from 'axios';

const instance = axios.create({
    baseURL: `https://neko-back.herokuapp.com/2.0`,
    withCredentials: true,
    headers: {},
})

//api
export const authMeApi = {
    me() {
        return instance.post<AuthMeResponseType>(`/auth/me`)
    },
}

export type AuthMeResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}