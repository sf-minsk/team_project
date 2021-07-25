import {authApi, LoginParamsType} from "../dal/auth-api";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false
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
    authApi.login(data)
        .then(res => {
            console.log(res.data)
            dispatch(setSignInAC(true))
        })
        .catch(e => {
            console.log(e.response.data.error)
            // e.response ? e.response.data.error : (e.message + ', more details in the console');
        })
}

//types
export type SetSignInActionType = ReturnType<typeof setSignInAC>
export type LoginActionsType = SetSignInActionType