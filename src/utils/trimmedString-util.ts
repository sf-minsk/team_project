export const trimmedString = (str: string, number: number) => {
    if (str.length > number) {
        return str.substring(0, number) + '...'
    } else {
        return str
    }
}