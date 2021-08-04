import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: `http://localhost:7542/2.0`,
    withCredentials: true,
})

// API
export const changePasswordApi = {
    changePassword(model: ChangePasswordModelType) {
        return instance.post<ChangePasswordResponseType>(`auth/forgot`, model)
    },
    setNewPassword(model: SetNewPasswordType) {
        return instance.post<SetNewPasswordResponseType>('auth/set-new-password', model)
    },
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
type SetNewPasswordType = {
    password: string,
    resetPasswordToken: string,
}
type SetNewPasswordResponseType = {
    info: string,
    error: string,
}