import axios from 'axios';

const instance = axios.create({
    // baseURL: `https://neko-back.herokuapp.com/2.0`,
    baseURL: `http://localhost:7542/2.0`,
    withCredentials: true,
})

//api
export const registerApi = {
    register(email: string, password: string) {
        return instance.post<RegisterResponseType>(`/auth/register`, {email, password})
    },
}

// export type RegisterRequestDataType = {
//     email: string
//     password: string
// }
export type RegisterResponseType = {
    error?: string
}