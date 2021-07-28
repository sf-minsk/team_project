import {authApi, LoginParamsType} from '../dal/auth-api';
import {setProfileAC, SetProfileActionType} from './profile-reducer';
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from './app-reducer';
import {AppThunk} from './store';

const initialState = {
    isLoggedIn: false
    //profile

}
export type InitialStateType = typeof initialState


export const authReducer = (state = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {

        case 'Login/SET-SIGN-IN':
            return {
                ...state, isLoggedIn: action.value
            };

        default:
            return state;
    }
};

//actions
export const setSignInAC = (value: boolean) =>
    ({type: 'Login/SET-SIGN-IN', value} as const)

//thunks
export const loginTC = (data: LoginParamsType): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            let res = await authApi.login(data)
            dispatch(setProfileAC(res.data))
            dispatch(setSignInAC(true))
            dispatch((setAppStatusAC('succeeded')))
        } catch (err) {
            const error = err.response ? err.response.data.error : (err.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC('failed'))
        }

    }
export const logoutTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authApi.logout()
        dispatch(setSignInAC(false))
        dispatch((setAppStatusAC('succeeded')))
    } catch (err) {
        // dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        dispatch(setAppStatusAC('failed'))
    }
}


//types
export type LoginActionsType =
    | SetSignInActionType
    | SetProfileActionType
    | SetAppStatusActionType
    | SetAppErrorActionType

export type SetSignInActionType = ReturnType<typeof setSignInAC>

