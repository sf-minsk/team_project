import axios from 'axios';

const instance = axios.create({
    baseURL: `https://neko-back.herokuapp.com/2.0`,
    // baseURL: `http://localhost:7542/2.0/`,
    withCredentials: true,
})

export const cardPacksApi = {
    fetchPacks(payload?: PacksRequestDataType) {
        let generateURL = '?'
        if (!!payload) {
            Object.entries(payload).forEach(el => {
                generateURL += el[0] + '=' + el[1] + '&'
            })
        }
        const newURL = generateURL.slice(0, -1)
        return instance.get<PacksResponseType>(`cards/pack${newURL}`)
    },
    createPack(pack: CreatePackRequestType) {
        return instance.post(`cards/pack`, pack)
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    updatePack(data: UpdatePackRequestType) {
        return instance.put(`cards/pack`, {cardsPack: data})
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
    },

    createCard(data: CreateCardType) {
        return instance.post(`cards/card`, {card: data})
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
    },
    editCard(data: EditCardRequestType) {
        return instance.put(`cards/card`, {card: data})
    },
    updatedGrade(payload: GradeRequestType) {
        return instance.put<GradeResponseType>(`/cards/grade`, payload)
    },
}
// get packs type

export type PacksRequestDataType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export type PacksResponseType = {
    cardPacks: Array<PacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
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

// create pack type

export type CreatePackRequestType = {
    cardsPack: PackDataType
}
export type PackDataType = {
    name?: string | null
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}
// update pack type

export type UpdatePackRequestType = {
    _id: string,
    name?: string,
}

// get pack type

export type PackRequestType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
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

// create card type
export type CreateCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}
export type EditCardRequestType = CreateCardType & {
    _id: string
}

//update grade
export type GradeRequestType = {
    grade: number
    card_id: string
}
export type GradeResponseType = {
    updatedGrade: GradeDataType
}
export type GradeDataType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}