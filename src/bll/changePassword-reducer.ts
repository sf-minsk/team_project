const initialState = {}
export type InitialStateType = typeof initialState


export const changePasswordReducer = (state = initialState, action: ChangePasswordActionsType): InitialStateType => {
    switch (action.type) {

        case 'CHANGE-PASSWORD':
            return {
                ...state,
            };

        default:
            return state;
    }
};

//actions
export const changePasswordAC = () =>
    ({type: 'CHANGE-PASSWORD'} as const)

//thunks


//types
export type ChangePasswordActionType = ReturnType<typeof changePasswordAC>
export type ChangePasswordActionsType = ChangePasswordActionType