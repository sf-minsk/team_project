import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

// API
export const changePasswordApi = {
    changePassword(model: ChangePasswordModelType) {
        return instance.post<ChangePasswordResponseType>(`auth/forgot`, model)
    }
}

// Types
type ChangePasswordModelType = {
    email: string,
    from: string,
    message: string,
}
type ChangePasswordResponseType = {
    info: string,
    error: string,
}