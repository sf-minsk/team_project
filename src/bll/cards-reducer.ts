import {AppThunk} from './store';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';
import {cardPacksApi, CardPacksDataType, CardPacksRequestDataType, CardPacksResponseType} from '../dal/cards-api';


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

// const initialState = {
//     cardPacks: [] as CardPacksDataType[],
//     page: 1,
//     pageCount: 5,
//     cardPacksTotalCount: null as string,
//     minCardsCount: 0,
//     maxCardsCount: 20,
//     token: null as string,
//     tokenDeathTime: null as string,
// }
const initialState = {
    cardPacks: [] as CardPacksDataType[]
}as CardPacksResponseType
export type InitialStateType = typeof initialState


export const cardsReducer = (state = initialState, action: CardsActionsType): InitialStateType => {

    switch (action.type) {

        case 'cards/SET-CARD-PACKS':
            return {
                ...state, ...action.data
            }

        default:
            return state;
    }
}

//actions
export const setCardPacksAC = (data: CardPacksResponseType) =>
    ({type: 'cards/SET-CARD-PACKS', data} as const)


//thunks
export const setCardPacksTC = (data?: CardPacksRequestDataType): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await cardPacksApi.fetchPacks(data)
            dispatch(setCardPacksAC(res.data))
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }


//types
export type SetCardPacksActionType = ReturnType<typeof setCardPacksAC>

export type CardsActionsType =
    | SetCardPacksActionType

