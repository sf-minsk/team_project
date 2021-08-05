import axios from 'axios';

const instance = axios.create({
    // baseURL: `https://neko-back.herokuapp.com/2.0`,
    baseURL: `http://localhost:7542/2.0`,
    withCredentials: true,
})


// export const cardsPackApi = {
//     fetchPacks(page?: number, pageCount?: number, sortPacks?: 0 | 1, updated?: string, user_id?: string) {
//         return instance.get<CardsPackResponseType>(
//             `/cards/pack?page=${page}&pageCount=${pageCount}&sortPacks=${sortPacks}${updated}&`
//             + (user_id ? `user_id=${user_id}` : ``))
//     },
// }

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
}

export type CardPacksRequestDataType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string | null
}

export type CardPacksResponseType = {
    cardPacks: Array<CardPacksDataType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type CardPacksDataType = {
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