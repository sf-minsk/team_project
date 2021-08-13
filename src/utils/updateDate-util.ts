export const updateDate = (cardUpdateDate: string) => {
    let formattedDate = new Date(cardUpdateDate)
    return formattedDate.toLocaleString('es', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
    })
}