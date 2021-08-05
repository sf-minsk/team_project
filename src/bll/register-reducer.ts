import {AppThunk} from './store';
import {registerApi} from '../dal/register-api';
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC} from './app-reducer';

const initialState = {
    isRegistered: false,
}
export type InitialStateType = typeof initialState


export const registerReducer = (state = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {

        case 'register/SET-SIGN-UP':
            return {
                ...state, isRegistered: true
            }

        default:
            return state;
    }
};

//actions
export const setSignUpAC = () =>
    ({type: 'register/SET-SIGN-UP'} as const)


//thunks
export const setSignUpTC = (email: string, password: string): AppThunk =>
    async dispatch => {
        try {
            dispatch(setAppStatusAC('loading'))
            await registerApi.register(email, password)
            dispatch(setSignUpAC())
            dispatch(setAppStatusAC('succeeded'))
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
            dispatch(setAppStatusAC('failed'))
        }
    }


//types
export type SetSignUpActionType = ReturnType<typeof setSignUpAC>

export type RegisterActionsType =
    | SetSignUpActionType
    | SetAppErrorActionType