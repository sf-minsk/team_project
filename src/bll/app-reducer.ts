import {Dispatch} from "redux";
import {authApi} from "../dal/auth-api";
import {setSignInAC, SetSignInActionType} from "./auth-reducer";

const initialState = {
    error: null as string | null,
    status: 'idle' as RequestStatusType, ///
    isInitialized: false ///is necessary data for all app is requested
}
export type InitialStateType = typeof initialState


export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    console.log(action)
    switch (action.type) {

        case 'app/SET-APP-ERROR':
            return {
                ...state, error: action.error
            }
        case 'app/SET-APP-STATUS':
            return {
                ...state, status: action.status
            }
        case "app/SET-IS-INITIALIZED":
            return {
                ...state, isInitialized: action.value
            }
        default:
            return state;
    }
}

//actions
export const setAppErrorAC = (error: string | null) =>
    ({type: 'app/SET-APP-ERROR', error} as const)

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'app/SET-APP-STATUS', status} as const)

export const setIsInitializedAC = (value: boolean) =>
    ({type: 'app/SET-IS-INITIALIZED', value} as const)

//thunks
export const initializeAppTC = () => (dispatch: Dispatch<AppActionsType>) => {
    ///
    authApi.me()
        .then(res => {
            if (res.data) {
                console.log(res.data)
                dispatch(setSignInAC(true))
            }
            dispatch(setIsInitializedAC(true))
        })
        .catch((err) => {
            const error = err.response ? err.response.data.error : (err.message + ', more details in the console')
            // dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        })
        .finally(() => dispatch(setIsInitializedAC(true)))
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetSignInActionType
    | ReturnType<typeof setIsInitializedAC>
