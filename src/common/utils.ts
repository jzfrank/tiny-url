import { v4 as uuidv4 } from "uuid"

const SHORTENED_URL_LENGTH = 6 as const

export const shortenUrlIdentifier = () => {
    return uuidv4().slice(0, SHORTENED_URL_LENGTH)
}

export const urlIsValid = (url: string) => {
    return url.trim().length > 0
}

export const isValidUrl = (url: string) => {
    try {
        return Boolean(new URL(url))
    } catch (e) {
        return false
    }
}
