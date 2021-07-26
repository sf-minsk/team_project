import {AppThunk} from "./store";
import {changePasswordApi} from "../dal/changePassword-api";
import {changePasswordModel} from "../utils/changePasswordModel-util";

const initialState = {
    changeProcess: false
}

export const changePasswordReducer = (state: initialStateType = initialState, action: ChangePasswordActionsType) => {
    switch (action.type) {
        case "CHANGE-PASSWORD":
            return {...state, changeProcess: true}
        default:
            return state
    }
}

// Action creators
export const changePasswordAC = () => {
    return {
        type: "CHANGE-PASSWORD",
        changeProcess: true,
    } as const
}

//THUNK creators
export const changePasswordTC = (email: string): AppThunk => async dispatch => {
    try {
        await changePasswordApi.changePassword(changePasswordModel(email))
        dispatch(changePasswordAC())
    } catch (e) {
        alert(e)
    } finally {
    }
}

// Types
type initialStateType = typeof initialState
export type ChangePasswordActionsType =
    | ReturnType<typeof changePasswordAC>

