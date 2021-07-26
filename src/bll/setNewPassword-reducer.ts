import {AppThunk} from "./store";
import {changePasswordApi} from "../dal/changePassword-api";

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
    try {
        await changePasswordApi.setNewPassword({password, resetPasswordToken: token})
        dispatch(setNewPasswordAC())
    } catch (e) {
        alert(e)
    }

}

// Types
type initialStateType = {
    newPasswordSet: boolean
}
export type setNewPasswordActionTypes =
    | ReturnType<typeof setNewPasswordAC>