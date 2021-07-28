import axios from 'axios';

const instance = axios.create({
    baseURL: `https://neko-back.herokuapp.com/2.0`,
    withCredentials: true,
})

//api
export const registerApi = {
    register(data: RegisterRequestDataType) {
        return instance.post<RegisterResponseType>(`/auth/register`, data)
    },
}

export type RegisterRequestDataType = {
    email: string
    password: string
}
export type RegisterResponseType = {
    error?: string
}