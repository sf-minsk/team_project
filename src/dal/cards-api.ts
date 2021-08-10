import axios from 'axios';

const instance = axios.create({
    // baseURL: `https://neko-back.herokuapp.com/2.0`,
    baseURL: `http://localhost:7542/2.0/`,
    withCredentials: true,
})

const createObjectForRequest = () => {

}


export const cardPacksApi = {
    fetchPacks(payload?: CardPacksRequestDataType) {
        let generateURL = '?'
        if (!!payload) {
            Object.entries(payload).forEach(el => {
                generateURL += el[0] + '=' + el[1] + '&'
            })
        }
        const newURL = generateURL.slice(0, -1)
        return instance.get<CardPacksResponseType>(`cards/pack${newURL}`)
    },
    createPack(cardsPack: CardsPackRequestType) {
        return instance.post(`cards/pack`, cardsPack)
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    fetchPack(payload: PackRequestType) {
        let generateURL = '?'
        if (!!payload) {
            Object.entries(payload).forEach(el => {
                generateURL += el[0] + '=' + el[1] + '&'
            })
        }
        const newURL = generateURL.slice(0, -1)
        return instance.get<PackResponseType>(`/cards/card${newURL}`)
    }
}

export type CardPacksRequestDataType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export type CardPacksResponseType = {
    cardPacks: Array<CardPacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type CardPacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

export type CardsPackDataType = {
    name?: string | null
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}
export type CardsPackRequestType = {
    cardsPack: CardsPackDataType
}

export type PackRequestType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type PackResponseType = {
    cards: Array<OnePackType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type OnePackType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}