import {CardPacksRequestDataType} from "../dal/cards-api";
import {CardsInitialStateType} from "../bll/cards-reducer";

export const cardsApiModel = (cards: CardsInitialStateType, data?: CardPacksRequestDataType) => {
    debugger
    const apiModel = {
        packName: cards.packName,
        min: cards.min,
        max: cards.max,
        sortPacks: JSON.stringify(cards.sortPacksDirection) + cards.sortBy,
        page: cards.page,
        pageCount: cards.pageCount,
        user_id: cards.user_id,
    }
    return {...apiModel, ...data}
}