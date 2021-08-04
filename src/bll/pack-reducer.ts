import {cardPacksApi, FetchPacksPayloadType, PacksType} from "../dal/cardsPack-api";
import {AppThunk} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";

const initialState = {} as PacksType

export const packReducer = (state: PacksType = initialState, action: PacksActionTypes): PacksType => {
    switch (action.type) {
        case "packs/SET-PACKS":
            return {...state, ...action.data}
        default:
            return state
    }
}

//actions
const fetchPacksAC = (data: PacksType) => ({
    type: 'packs/SET-PACKS',
    data
} as const)

//thunk
export const fetchPacksTC = (data?: FetchPacksPayloadType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardPacksApi.fetchPacks(data)
        dispatch(fetchPacksAC(res.data))
        dispatch(setAppErrorAC('success'))
    } catch (e) {
        dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message))
        dispatch(setAppStatusAC('failed'))
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

//types
export type PacksActionTypes = FetchPacksActionType
export type FetchPacksActionType = ReturnType<typeof fetchPacksAC>

