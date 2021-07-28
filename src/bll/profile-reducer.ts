import {ResponseAuthType} from "../dal/auth-api";

const initialState: ProfileStateType = {
    _id: null,
    email: null,
    name: null,
    avatar: null,
    publicCardPacksCount: null,
    created: null,
    updated: null,
    isAdmin: null,
    verified: null,
    rememberMe: null,
    error: null
}

export type ProfileStateType = {
    _id: string | null,
    email: string | null,
    name: string | null,
    avatar?: string | null,
    publicCardPacksCount: number | null,
    created: Date | null,
    updated: Date | null,
    isAdmin: boolean | null,
    verified: boolean | null,
    rememberMe: boolean | null,
    error?: string | null
}

export const profileReducer = (state = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {

        case 'Profile/SET-PROFILE':
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
    ({type: 'Profile/SET-PROFILE', payload: data} as const)


//thunks


//types

type ProfileActionsType = SetProfileActionType

export type SetProfileActionType = ReturnType<typeof setProfileAC>