import {authApi, LoginParamsType} from "../dal/auth-api";
import {Dispatch} from "redux";
import {setProfileAC, SetProfileActionType} from "./profile-reducer";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";

const initialState = {
    isLoggedIn: false
    //profile

}
export type InitialStateType = typeof initialState


export const authReducer = (state = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {

        case 'login/SET-SIGN-IN':
            return {
                ...state, isLoggedIn: action.value
            };

        default:
            return state;
    }
};

//actions
export const setSignInAC = (value: boolean) =>
    ({type: 'login/SET-SIGN-IN', value} as const)

//thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<LoginActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then(res => {
            dispatch(setProfileAC(res.data))
            dispatch(setSignInAC(true))
            dispatch((setAppStatusAC('succeeded')))
        })
        .catch((err) => {
            const error = err.response ? err.response.data.error : (err.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}
export const logoutTC = () => (dispatch: Dispatch<LoginActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logout()
        .then(res => {
            dispatch(setSignInAC(false))
            dispatch((setAppStatusAC('succeeded')))
        })
        .catch((err) => {
            const error = err.response ? err.response.data.error : (err.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
}


//types
export type AuthActionType =
    SetSignInActionType
    | SetProfileActionType
    | SetAppStatusActionType
    | SetAppErrorActionType

export type SetSignInActionType = ReturnType<typeof setSignInAC>

export type LoginActionsType = AuthActionType