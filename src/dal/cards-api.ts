import axios from 'axios';

const instance = axios.create({
    // baseURL: `https://neko-back.herokuapp.com/2.0`,
    baseURL: `http://localhost:7542/2.0`,
    withCredentials: true,
})


export const cardsPackApi = {
    cardsPack(min?: number, max?: number, page?: number, pageCount?: number) {
        return instance.get<CardsPackResponseType>(`/cards/pack?min=${min}&max=${max}&page=${page}&pageCount=${pageCount}&`)
    },
}

// export type CardsPackRequestDataType = {
//     packName?: string
//     min?: number
//     max?: number
//     sortPacks?: number
//     page?: number
//     pageCount?: number
//     user_id?: string
// }

export type CardsPackResponseType = {
    cardPacks: Array<CardsPackDataType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type CardsPackDataType = {
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