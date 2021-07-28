import {AppThunk} from './store';
import {registerApi, RegisterRequestDataType} from '../dal/register-api';
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC} from './app-reducer';

const initialState = {
    isRegistered: false,
}
export type InitialStateType = typeof initialState


export const registerReducer = (state = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {

        case 'register/SET-SIGN-UP':
            return {
                ...state, isRegistered: action.isRegistered
            }

        default:
            return state;
    }
};

//actions
export const setSignUpAC = (isRegistered: boolean) =>
    ({type: 'register/SET-SIGN-UP', isRegistered} as const)


//thunks
export const setSignUpTC = (data: RegisterRequestDataType): AppThunk =>
    async dispatch => {
        try {
            dispatch(setAppStatusAC('loading'))
            await registerApi.register(data)
            dispatch(setSignUpAC(true))
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