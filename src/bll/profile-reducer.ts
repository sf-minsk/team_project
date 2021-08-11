import {ResponseAuthType} from "../dal/auth-api";

const initialState = {} as ProfileStateType
export type ProfileStateType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    created: string,
    updated: string,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
    error?: string,
}

export const profileReducer = (state = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {

        case 'profile/SET-PROFILE':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;

    }
}
//actions

export const setProfileAC = (data: ResponseAuthType) =>
    ({type: 'profile/SET-PROFILE', payload: data} as const)


//thunks


//types

export type ProfileActionsType = SetProfileActionType

export type SetProfileActionType = ReturnType<typeof setProfileAC>