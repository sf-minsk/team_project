import {AppRootStateType, AppThunk} from './store';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';
import {
    cardPacksApi,
    CardPacksRequestDataType,
    CardPacksResponseType,
    CardPacksType,
    CardsPackRequestType
} from '../dal/cards-api';
import {cardsApiModel} from '../utils/cardsApiModel-util';


const initialState = {
    cardPacks: [] as Array<CardPacksType>,
    myPacks: false,
    page: 1,
    pageCount: 5,
    min: 0,
    max: 110,
    minCardsCount: 0,
    maxCardsCount: 110,
    sortPacksDirection: 0,
    sortBy: 'updated',
    user_id: '',
    packName: '',
    searchText: '',
    cardPacksTotalCount: 1,
} as CardsInitialStateType

export type CardsInitialStateType = CardPacksResponseType & {
    myPacks: boolean
    sortPacksDirection: number
    sortBy: string
    user_id: string
    packName: string
    searchText: string
    min: number
    max: number
    cardPacksTotalCount: number
}

export const cardsReducer = (state = initialState, action: CardsActionsType): CardsInitialStateType => {

    switch (action.type) {

        case 'cards/SET-CARD-PACKS':
            return {
                ...state,
                ...action.data,
                myPacks: action.data.user_id.length > 1,
                sortBy: action.data.sortPacks.slice(1),
                sortPacksDirection: Number(action.data.sortPacks.substring(0, 1)),
                searchText: action.data.packName,
            }

        default:
            return state;
    }
}

//actions
export const setCardPacksAC = (data: CardPacksResponseType & NewCardsApiModelType) =>
    ({type: 'cards/SET-CARD-PACKS', data} as const)


//thunks
export const setCardPacksTC = (data?: CardPacksRequestDataType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        const newCardsApiModel = cardsApiModel(getState().cards, data)
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await cardPacksApi.fetchPacks(newCardsApiModel)
            dispatch(setCardPacksAC({...res.data, ...newCardsApiModel}))
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
            dispatch(setCardPacksTC({packName: ''}))
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export const deletePackTC = (packId: string): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        try {
            await cardPacksApi.deletePack(packId)
            const cardsState = getState().cards
            const remainPacks = cardsState.cardPacksTotalCount - (cardsState.pageCount * (cardsState.page - 1))
            dispatch(setCardPacksTC({
                page: remainPacks === 1
                    ? cardsState.page === 1 ? cardsState.page : cardsState.page - 1
                    : cardsState.page
            }))
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }


//types
export
type SetCardPacksActionType = ReturnType<typeof setCardPacksAC>
type NewCardsApiModelType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}

export type CardsActionsType =
    | SetCardPacksActionType
