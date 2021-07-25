import {AppThunk} from './store';
import {registerApi, RegisterRequestDataType} from '../dal/register-api';
import {setAppErrorAC, SetAppErrorActionType} from './app-reducer';

const initialState = {
    isRegistered: false,
}
export type InitialStateType = typeof initialState


export const registerReducer = (state = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {

        case 'SET-SIGN-UP':
            return {
                ...state, isRegistered: action.isRegistered
            }

        default:
            return state;
    }
};

//actions
export const setSignUpAC = (isRegistered: boolean) =>
    ({type: 'SET-SIGN-UP', isRegistered} as const)


//thunks
export const setSignUpTC = (data: RegisterRequestDataType): AppThunk =>
    async dispatch => {
    debugger
        try {
            const res = await registerApi.register(data)
            debugger
            dispatch(setSignUpAC(true))
        } catch (err) {
            const error = err.response ? err.response.data.error : (err.message + ', more details in the console')
            //console.log('Error: ', {...err})
            console.log(error)
            dispatch(setAppErrorAC(error))
        }
    }


//types
export type SetSignUpActionType = ReturnType<typeof setSignUpAC>
export type RegisterActionsType =
    | SetSignUpActionType
    | SetAppErrorActionType