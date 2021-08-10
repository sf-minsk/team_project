import {AppRootStateType, AppThunk} from './store';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';
import {cardPacksApi, PackRequestType, PackResponseType, OnePackType} from '../dal/cards-api';
import {packApiModel} from '../utils/cardsApiModel-util';


const initialState = {
    cards: [] as Array<OnePackType>,
    cardsTotalCount: 1,
    minGrade: 0,
    maxGrade: 5,
    page: 1,
    pageCount: 5,
    packUserId: '',
    cardAnswer: '',
    cardQuestion: '',
    min: 0,
    max: 5,
    sortCardDirection: 0,
    sortBy: 'grade',
    cardsPack_id: '', //611254bb97435f0004784729
} as PackInitialStateType

export type PackInitialStateType = PackResponseType & {
    cardAnswer: string
    cardQuestion: string
    min: number
    max: number
    sortCardDirection: number
    sortBy: string
    cardsPack_id: string
}


export const packReducer = (state = initialState, action: PackActionsType): PackInitialStateType => {

    switch (action.type) {

        case 'cards/SET-PACK':
            return {
                ...state,
                ...action.data,
                sortBy: action.data.sortCards.slice(1),
                sortCardDirection: Number(action.data.sortCards.substring(0, 1)),
            }
        default:
            return state;
    }
}

//actions
export const setPackAC = (data: PackResponseType & NewPackApiModelType) =>
    ({type: 'cards/SET-PACK', data} as const)


//thunks
export const setPackTC = (data: PackRequestType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        const newPackApiModel = packApiModel(getState().pack, data)
        dispatch(setAppStatusAC('loading'))
        try {
            const res = await cardPacksApi.fetchPack(newPackApiModel)
            dispatch(setPackAC({...res.data, ...newPackApiModel}))
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }

//types
export
type SetPackActionType = ReturnType<typeof setPackAC>

export type PackActionsType =
    | SetPackActionType

type NewPackApiModelType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}
