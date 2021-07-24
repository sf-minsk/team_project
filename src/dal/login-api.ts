import axios from 'axios';

const instance = axios.create({
    baseURL: '',
    withCredentials: true,
    headers: {
        'api-key': '',
    },
})

//api
export const loginApi = {
    login(data: any) {
        return instance.post(``, data)
    },
}