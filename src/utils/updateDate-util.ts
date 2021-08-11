export const updateDate = (cardUpdateDate: string) => {
    let formatedDate = new Date(cardUpdateDate)
    return  formatedDate.toLocaleString('es', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
    })
}