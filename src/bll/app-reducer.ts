import {authApi} from '../dal/auth-api';
import {setSignInAC, SetSignInActionType} from './auth-reducer';
import {AppThunk} from './store';
import {setProfileAC} from "./profile-reducer";

const initialState = {
    error: null as string | null,
    status: 'idle' as RequestStatusType, ///
    isInitialized: false ///is necessary data for all app is requested
}
export type InitialStateType = typeof initialState


export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    console.log(action)
    switch (action.type) {

        case 'App/SET-APP-ERROR':
            return {
                ...state, error: action.error
            }
        case 'App/SET-APP-STATUS':
            return {
                ...state, status: action.status
            }
        case 'App/SET-IS-INITIALIZED':
            return {
                ...state, isInitialized: action.value
            }
        default:
            return state;
    }
}

//actions
export const setAppErrorAC = (error: string | null) =>
    ({type: 'App/SET-APP-ERROR', error} as const)

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'App/SET-APP-STATUS', status} as const)

export const setIsInitializedAC = (value: boolean) =>
    ({type: 'App/SET-IS-INITIALIZED', value} as const)

//thunks

export const initializeAppTC = (): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            let res = await authApi.me()
            if (res.data) {
                dispatch(setProfileAC(res.data))
                dispatch(setSignInAC(true))
            }
            dispatch(setIsInitializedAC(true))
        } catch (err) {
            // dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
            dispatch(setAppStatusAC('failed'))
        } finally {
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('succeeded'))
        }
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
