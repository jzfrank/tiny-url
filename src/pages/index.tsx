import { Button, Text, TextInput, Title } from "@tremor/react"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { uuid } from "uuidv4"
import { EitherType } from "~/common/Either"
import { env } from "~/env.mjs"
import { api } from "~/utils/api"
import { ToastContainer, toast } from "react-toastify"

const urlIsValid = (url: string) => {
    return url.trim().length > 0
}
const shortenUrlIdentifier = (url: string) => {
    return uuid().slice(0, SHORTENED_URL_LENGTH)
}

const SHORTENED_URL_LENGTH = 6 as const

export default function Home() {
    const router = useRouter()
    const [inputUrl, setInputUrl] = useState("")
    const [shortenedUrlIdentifier, setShortenedUrlIdentifier] = useState("")
    const [inputShortUrlExists, setInputShortUrlExists] = useState(false)

    const urlExists = api.v1Router.urlExists.useQuery(
        { url: inputUrl },
        {
            onSuccess: (data) => {
                switch (data.type) {
                    case EitherType.ok:
                        setInputShortUrlExists(data.ok)
                        return data.ok
                    case EitherType.bad:
                        return false
                }
            },
        }
    )

    const createUrlMapping = api.v1Router.createUrl.useMutation({
        onSuccess: (data) => {
            switch (data.type) {
                case EitherType.ok:
                    toast.success("Successfully created URL mapping")
                    return data.ok
                case EitherType.bad:
                    toast.error("Failed to create URL mapping")
                    return false
            }
        },
    })

    const shortenHandler = () => {
        if (inputShortUrlExists) return
        const shortenedUrlIdentifier = shortenUrlIdentifier(inputUrl)
        createUrlMapping.mutate({
            fromUrl: inputUrl,
            toUrlIdentifier: shortenedUrlIdentifier,
        })
        setShortenedUrlIdentifier(shortenedUrlIdentifier)
    }

    const shortendUrl = useMemo(
        () => new URL(shortenedUrlIdentifier, env.NEXT_PUBLIC_BASE_URL).href,
        [shortenedUrlIdentifier]
    )

    return (
        <div className="mx-10 my-10 flex flex-col items-center gap-5">
            <Title>Tiny URL Service</Title>
            <div className="flex flex-col items-end gap-3">
                <div className="flex items-end gap-3">
                    <div>
                        <Text>Enter a URL to shorten:</Text>
                        <TextInput
                            className="w-64"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                        />
                    </div>
                    <Button
                        className="w-24"
                        onClick={shortenHandler}
                        disabled={!urlIsValid(inputUrl)}
                    >
                        Confirm
                    </Button>
                </div>
                <div className="flex flex-row items-center gap-3">
                    {urlIsValid(shortenedUrlIdentifier) && (
                        <Text>Shortened URL: {shortenedUrlIdentifier}</Text>
                    )}
                </div>
                <div>
                    {inputShortUrlExists && (
                        <Text className="text-red-500">
                            The shortened URL already exists
                        </Text>
                    )}
                </div>
                <div>
                    {shortendUrl.length > 0 && (
                        <div>
                            <Text>Shortened url: {shortendUrl}</Text>
                            <Button
                                onClick={() => {
                                    void router.push(
                                        `api/${shortenedUrlIdentifier}`
                                    )
                                }}
                            >
                                Go
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
