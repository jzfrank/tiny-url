import { Button, Text, TextInput, Title } from "@tremor/react"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { uuid } from "uuidv4"
import { EitherType } from "~/common/Either"
import { env } from "~/env.mjs"
import { api } from "~/utils/api"
import { toast } from "react-toastify"

const urlIsValid = (url: string) => {
    return url.trim().length > 0
}

const shortenUrlIdentifier = () => {
    return uuid().slice(0, SHORTENED_URL_LENGTH)
}

const SHORTENED_URL_LENGTH = 6 as const

export default function Home() {
    const router = useRouter()
    const [inputUrl, setInputUrl] = useState("")
    const [shortenedUrlIdentifier, setShortenedUrlIdentifier] = useState("")
    const [inputShortUrlExists, setInputShortUrlExists] = useState(false)
    const [inputShortenedUrlIdentifier, setInputShortenedUrlIdentifier] =
        useState("")
    const [useCustomIdentifier, setUseCustomIdentifier] = useState(false)

    const urlExistsMutation = api.v1Router.urlExistsMutation.useMutation({
        onSuccess: (data) => {
            switch (data.type) {
                case EitherType.ok:
                    setInputShortUrlExists(data.ok.exists)
                    if (data.ok.exists) {
                        setShortenedUrlIdentifier(data.ok.shortenedId)
                    } else {
                        const shortenedUrlIdentifier = shortenUrlIdentifier()
                        createUrlMapping.mutate({
                            fromUrl: inputUrl,
                            toUrlIdentifier: shortenedUrlIdentifier,
                        })
                        setShortenedUrlIdentifier(shortenedUrlIdentifier)
                    }
                    return data.ok
                case EitherType.bad:
                    return false
            }
        },
    })

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
        if (!useCustomIdentifier) {
            urlExistsMutation.mutate({ url: inputUrl })
        } else {
        }
    }

    const shortendUrl = useMemo(
        () => new URL(shortenedUrlIdentifier, env.NEXT_PUBLIC_BASE_URL).href,
        [shortenedUrlIdentifier]
    )

    return (
        <div className="mx-10 my-10 flex flex-col items-center gap-5">
            <Title>Tiny URL Service</Title>
            <div className="flex w-96 flex-col items-start gap-3">
                <div className="flex items-end gap-3">
                    <div>
                        <Text>Enter a URL to shorten:</Text>
                        <TextInput
                            className="w-64"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-4 flex items-center">
                        <input
                            id="default-radio-1"
                            type="radio"
                            checked={!useCustomIdentifier}
                            onClick={() => setUseCustomIdentifier(false)}
                            value=""
                            name="default-radio"
                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 "
                        />
                        <label
                            htmlFor="default-radio-1"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Randomly Generate Short URL
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="default-radio-2"
                            checked={useCustomIdentifier}
                            onClick={() => setUseCustomIdentifier(true)}
                            type="radio"
                            value=""
                            name="default-radio"
                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 "
                        />
                        <label
                            htmlFor="default-radio-2"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Generate Short URL with Custom Identifier
                        </label>
                    </div>
                </div>
                {useCustomIdentifier ? (
                    <div className="flex flex-row items-center gap-3">
                        <TextInput
                            className="w-64"
                            value={inputShortenedUrlIdentifier}
                            onChange={(e) =>
                                setInputShortenedUrlIdentifier(e.target.value)
                            }
                        />
                        <Button
                            onClick={shortenHandler}
                            disabled={!urlIsValid(inputUrl)}
                        >
                            Generate
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            onClick={shortenHandler}
                            disabled={!urlIsValid(inputUrl)}
                        >
                            Randomly Generate Short URL
                        </Button>
                    </div>
                )}

                <div>
                    {shortenedUrlIdentifier.length > 0 && (
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
