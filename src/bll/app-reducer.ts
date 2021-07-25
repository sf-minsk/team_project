const initialState = {
    error: null as string | null,
}
export type InitialStateType = typeof initialState


export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {

        case 'SET-APP-ERROR':
            return {
                ...state, error: action.error
            }

        default:
            return state;
    }
}

//actions
export const setAppErrorAC = (error: string | null) =>
    ({type: 'SET-APP-ERROR', error} as const)

//thunks


//types
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type AppActionsType =
    | SetAppErrorActionType