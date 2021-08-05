import axios from 'axios';

const instance = axios.create({
    // baseURL: `https://neko-back.herokuapp.com/2.0`,
    baseURL: `http://localhost:7542/2.0`,
    withCredentials: true,
})

//api
export const cardPacksApi = {
    fetchPacks(payload?: FetchPacksPayloadType) {
        let generateURL = '?'
        if (!!payload) {
            Object.entries(payload).forEach(el => {
                generateURL += el[0] + '=' + el[1] + '&'
            })
        }
        const newURL = generateURL.slice(0, -1)
        return instance.get<PacksType>(`cards/pack${newURL}`)
    },
}

export type FetchPacksPayloadType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number
    page?: number
    pageCount?: number
    user_id?: number
}

export type PacksType = {
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

