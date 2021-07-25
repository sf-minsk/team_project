import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
    headers: {
        'api-key': '',
    },
})

//api
export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType>(`auth/login`, data)
    },
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}
