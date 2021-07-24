const initialState = {}
export type InitialStateType = typeof initialState


export const registerReducer = (state = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {

        case 'SET-SIGN-UP':
            return {
                ...state,
            };

        default:
            return state;
    }
};

//actions
export const setSignUpAC = () =>
    ({type: 'SET-SIGN-UP'} as const)

//thunks


//types
export type SetSignUpActionType = ReturnType<typeof setSignUpAC>
export type RegisterActionsType = SetSignUpActionType