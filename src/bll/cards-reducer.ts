import {AppThunk} from './store';
import {setAppStatusAC} from './app-reducer';
import {cardsPackApi, CardsPackDataType} from '../dal/cards-api';

// const initialState = [
//     {
//         _id: '610a53b49906843f45c0f280' as string,
//         user_id: '6101043d9906843f45c0f27f' as string,
//         user_name: 'team_project@gmail.com' as string,
//         private: false as boolean,
//         name: 'Pack 1' as string,
//         path: '/dev' as string,
//         grade: 0 as number,
//         shots: 0 as number,
//         cardsCount: 5 as number,
//         type: 'pack' as string,
//         rating: 5 as number,
//         created: '2021-08-01' as string,
//         updated: '2021-08-02' as string,
//         more_id: '6101043d9906843f45c0f27f' as string,
//         __v: 0 as number,
//     },
//     {
//         _id: '610a53b4sd06843f45c0f280' as string,
//         user_id: '6101043d9906843f68c0f27f' as string,
//         user_name: 'team_project@gmail.com' as string,
//         private: false as boolean,
//         name: 'Pack 2' as string,
//         path: '/dev' as string,
//         grade: 0 as number,
//         shots: 0 as number,
//         cardsCount: 5 as number,
//         type: 'pack' as string,
//         rating: 5 as number,
//         created: '2021-08-03' as string,
//         updated: '2021-08-04' as string,
//         more_id: '6101043d9906843f68c0f27f' as string,
//         __v: 0 as number,
//     },
//     {
//         _id: '610a53b4sd06843f45c0f280' as string,
//         user_id: '6101043d9906843f68c0f27f' as string,
//         user_name: 'team_project@gmail.com' as string,
//         private: false as boolean,
//         name: 'Pack 3' as string,
//         path: '/dev' as string,
//         grade: 0 as number,
//         shots: 0 as number,
//         cardsCount: 5 as number,
//         type: 'pack' as string,
//         rating: 5 as number,
//         created: '2021-08-03' as string,
//         updated: '2021-08-04' as string,
//         more_id: '6101043d9906843f68c0f27f' as string,
//         __v: 0 as number,
//     },
//     {
//         _id: '610a53b4sd06843f45c0f280' as string,
//         user_id: '6101043d9906843f68c0f27f' as string,
//         user_name: 'team_project@gmail.com' as string,
//         private: false as boolean,
//         name: 'Pack 4' as string,
//         path: '/dev' as string,
//         grade: 0 as number,
//         shots: 0 as number,
//         cardsCount: 5 as number,
//         type: 'pack' as string,
//         rating: 5 as number,
//         created: '2021-08-03' as string,
//         updated: '2021-08-04' as string,
//         more_id: '6101043d9906843f68c0f27f' as string,
//         __v: 0 as number,
//     },
// ]
const initialState: Array<CardsPackDataType> = []
export type InitialStateType = typeof initialState


export const cardsReducer = (state = initialState, action: CardsActionsType): InitialStateType => {

    switch (action.type) {

        case 'cards/SET-CARDS-PACK':
            return [...action.data]

        default:
            return state;
    }
}

//actions
export const setCardsPackAC = (data: InitialStateType) =>
    ({type: 'cards/SET-CARDS-PACK', data} as const)


//thunks
export const setCardsPackTC = (min?: number, max?: number, page?: number, pageCount?: number): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await cardsPackApi.cardsPack(min, max, page, pageCount)
            dispatch(setCardsPackAC(res.data.cardPacks))
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

