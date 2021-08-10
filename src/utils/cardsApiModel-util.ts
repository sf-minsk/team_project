import {CardPacksRequestDataType, PackRequestType} from '../dal/cards-api';
import {CardsInitialStateType} from "../bll/cards-reducer";
import {PackInitialStateType} from '../bll/pack-reducer';

export const cardsApiModel = (cards: CardsInitialStateType, data?: CardPacksRequestDataType) => {
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

export const packApiModel = (card: PackInitialStateType, data: PackRequestType) => {
    const apiModel = {
        cardAnswer: card.cardAnswer,
        cardQuestion: card.cardQuestion,
        cardsPack_id: card.cardsPack_id,
        min: card.min,
        max: card.max,
        sortCards: JSON.stringify(card.sortCardDirection) + card.sortBy,
        page: card.page,
        pageCount: card.pageCount,
    }
    return {...apiModel, ...data}
}