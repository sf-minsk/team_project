import {AppThunk} from './store';
import {changePasswordApi} from '../dal/changePassword-api';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';

const initialState = {
    newPasswordSet: false
}

export const setNewPasswordReducer = (state: initialStateType = initialState, action: setNewPasswordActionTypes) => {
    switch (action.type) {
        case 'setNewPassword/SET-NEW-PASSWORD':
            return {...state, newPasswordSet: true}
        default:
            return state
    }
}

// Action Creators
const setNewPasswordAC = () => {
    return {
        type: 'setNewPassword/SET-NEW-PASSWORD',
    } as const
}

// THUNK Creators
export const setNewPasswordTC = (password: string, token: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await changePasswordApi.setNewPassword({password, resetPasswordToken: token})
        dispatch(setNewPasswordAC())
        dispatch(setAppErrorAC(res.data.info, 'success'))
    } catch (e) {
        dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message))
        dispatch(setAppStatusAC('failed'))
    } finally {
        dispatch(setAppStatusAC('idle'))
    }

}

// Types
type initialStateType = {
    newPasswordSet: boolean
}
export type setNewPasswordActionTypes =
    | ReturnType<typeof setNewPasswordAC>