import {AppRootStateType, AppThunk} from './store';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';
import {cardPacksApi, GradeRequestType, OnePackType, PackRequestType} from '../dal/cards-api';


const initialState = [] as OnePackType[]

export type CardsForLearnInitialStateType = typeof initialState

export const cardsForLearnReducer = (state = initialState, action: CardsForLearnActionsType): CardsForLearnInitialStateType => {

    switch (action.type) {

        case 'cardsForLearn/SET-CARDS-OF-PACK':
            return [
                ...action.data,
            ]

        default:
            return state;
    }
}

//actions
export const setCardsOfPackAC = (data: OnePackType[]) =>
    ({type: 'cardsForLearn/SET-CARDS-OF-PACK', data} as const)


//thunks
export const fetchCardsOfPackTC = (data: PackRequestType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const cardsOfPackApiModel = {
            cardsPack_id: data.cardsPack_id,
            pageCount: data.pageCount,
        }
        try {
            const res = await cardPacksApi.fetchPack(cardsOfPackApiModel)
            dispatch(setCardsOfPackAC(res.data.cards))
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }


export const updatedGradeTC = (data: GradeRequestType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        try {
            const res = cardPacksApi.updatedGrade(data)
            //dispatch(updatedGradeAC(res))
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }

//types
export
type SetCardsOfPackActionType = ReturnType<typeof setCardsOfPackAC>
//type UpdatedGradeActionType = ReturnType<typeof updatedGradeAC>

export type CardsForLearnActionsType =
    | SetCardsOfPackActionType
//| UpdatedGradeActionType
