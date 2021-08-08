export const trimmedString = (str: string) => {
    if (str.length > 10) {
        return str.substring(0, 18) + '...'
    } else {
        return str
    }
}