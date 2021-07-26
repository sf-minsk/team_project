import {AppThunk} from "./store";
import {changePasswordApi} from "../dal/changePassword-api";
import {changePasswordModel} from "../utils/changePasswordModel-util";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";

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
    } as const
}

//THUNK creators
export const changePasswordTC = (email: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await changePasswordApi.changePassword(changePasswordModel(email))
        dispatch(changePasswordAC())
    } catch (e) {
        dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message))
        dispatch(setAppStatusAC('failed'))
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

// Types
type initialStateType = typeof initialState
export type ChangePasswordActionsType =
    | ReturnType<typeof changePasswordAC>

