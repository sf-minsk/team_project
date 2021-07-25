const initialState = {
    error: null as string | null,
    status: 'idle' as RequestStatusType,
}
export type InitialStateType = typeof initialState


export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {

        case 'SET-APP-ERROR':
            return {
                ...state, error: action.error
            }

        case 'SET-APP-STATUS':
            return {
                ...state, status: action.status
            }

        default:
            return state;
    }
}

//actions
export const setAppErrorAC = (error: string | null) =>
    ({type: 'SET-APP-ERROR', error} as const)

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'SET-APP-STATUS', status} as const)

//thunks


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType