import {AppThunk} from './store';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';
import {
    cardPacksApi,
    CardPacksRequestDataType,
    CardPacksResponseType,
    CardPacksType,
    CardsPackRequestType
} from '../dal/cards-api';


const initialState = {
    cardPacks: [] as CardPacksType[]
} as CardPacksResponseType

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

export const createPackTC = (data: CardsPackRequestType): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            await cardPacksApi.createPack(data)
            dispatch(setCardPacksTC())
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export const deletePackTC = (packId: string): AppThunk =>
    async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            await cardPacksApi.deletePack(packId)
            dispatch(setCardPacksTC())
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }


//types
export
type SetCardPacksActionType = ReturnType<typeof setCardPacksAC>

export type CardsActionsType =
    | SetCardPacksActionType
