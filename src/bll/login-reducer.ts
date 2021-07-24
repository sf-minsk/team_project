const initialState = {}
export type InitialStateType = typeof initialState


export const loginReducer = (state = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {

        case 'SET-SIGN-IN':
            return {
                ...state,
            };

        default:
            return state;
    }
};

//actions
export const setSignInAC = () =>
    ({type: 'SET-SIGN-IN'} as const)

//thunks


//types
export type SetSignInActionType = ReturnType<typeof setSignInAC>
export type LoginActionsType = SetSignInActionType