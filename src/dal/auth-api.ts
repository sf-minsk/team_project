import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

//api
export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<ResponseAuthType>(`auth/login`, data)
    },
    me(){
        return instance.post<ResponseAuthType>(`auth/me`)
    },
    logout(){
        return instance.delete(`auth/me`)
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type ResponseAuthType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
    error?: string
}
