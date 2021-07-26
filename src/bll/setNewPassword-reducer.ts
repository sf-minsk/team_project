import {AppThunk} from "./store";
import {changePasswordApi} from "../dal/changePassword-api";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";

const initialState = {
    newPasswordSet: false
}

export const setNewPasswordReducer = (state: initialStateType = initialState, action: setNewPasswordActionTypes) => {
    switch (action.type) {
        case 'SET-NEW-PASSWORD':
            return {...state, newPasswordSet: true}
        default:
            return state
    }
}

// Action Creators
const setNewPasswordAC = () => {
    return {
        type: 'SET-NEW-PASSWORD',
    } as const
}

// THUNK Creators
export const setNewPasswordTC = (password: string, token: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await changePasswordApi.setNewPassword({password, resetPasswordToken: token})
        dispatch(setNewPasswordAC())
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