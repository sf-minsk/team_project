import {AppThunk} from './store';
import {setAppStatusAC} from './app-reducer';
import {cardsPackApi} from '../dal/cards-api';

const initialState = {
    _id: '610a53b49906843f45c0f280' as string,
    user_id: '6101043d9906843f45c0f27f' as string,
    user_name: 'team_project@gmail.com' as string,
    private: false as boolean,
    name: 'Pack 1' as string,
    path: '/dev' as string,
    grade: 0 as number,
    shots: 0 as number,
    cardsCount: 5 as number,
    type: 'pack' as string,
    rating: 5 as number,
    created: '2021-08-01' as string,
    updated: '2021-08-02' as string,
    more_id: '6101043d9906843f45c0f27f' as string,
    __v: 0 as number,
}
export type InitialStateType = typeof initialState


export const cardsReducer = (state = initialState, action: CardsActionsType): InitialStateType => {

    switch (action.type) {

        case 'cards/SET-CARDS-PACK':
            return {
                ...state
            }

        default:
            return state;
    }
}

//actions
export const setCardsPackAC = () =>
    ({type: 'cards/SET-CARDS-PACK'} as const)


//thunks
export const setCardsPackTC = (): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await cardsPackApi.cardsPack()
            debugger
        } catch (err) {
            // dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }


//types
export type SetCardsPackActionType = ReturnType<typeof setCardsPackAC>

export type CardsActionsType =
    | SetCardsPackActionType

