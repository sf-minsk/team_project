import {PacksRequestDataType, PackRequestType} from '../dal/cards-api';
import {CardsInitialStateType} from "../bll/packs-reducer";
import {PackInitialStateType} from '../bll/pack-reducer';

export const packsApiModel = (packs: CardsInitialStateType, data?: PacksRequestDataType) => {
    const apiModel = {
        packName: packs.packName,
        min: packs.min,
        max: packs.max,
        sortPacks: JSON.stringify(packs.sortPacksDirection) + packs.sortBy,
        page: packs.page,
        pageCount: packs.pageCount,
        user_id: packs.user_id,
    }
    return {...apiModel, ...data}
}

export const packApiModel = (pack: PackInitialStateType, data: PackRequestType) => {
    const apiModel = {
        cardAnswer: pack.cardAnswer,
        cardQuestion: pack.cardQuestion,
        cardsPack_id: pack.cardsPack_id,
        min: pack.min,
        max: pack.max,
        sortCards: JSON.stringify(pack.sortCardDirection) + pack.sortBy,
        page: pack.page,
        pageCount: pack.pageCount,
    }
    return {...apiModel, ...data}
}