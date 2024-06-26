import { Button, Text, TextInput } from "@tremor/react"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
import { EitherType } from "~/common/Either"
import { urlIsValid } from "~/common/utils"
import { env } from "~/env.mjs"
import { api } from "~/utils/api"

const ShortenService = () => {
    const router = useRouter()
    const [inputUrl, setInputUrl] = useState("")
    const [shortenedUrlIdentifier, setShortenedUrlIdentifier] = useState("")
    const [inputShortenedUrlIdentifier, setInputShortenedUrlIdentifier] =
        useState("")
    const [useCustomIdentifier, setUseCustomIdentifier] = useState(false)

    const createUrlMapping = api.v1Router.createUrl.useMutation({
        onSuccess: (data) => {
            switch (data.type) {
                case EitherType.ok:
                    if (data.ok.created) {
                        toast.success("Successfully created URL mapping")
                    } else {
                        toast.success("URL mapping exists, using existed one")
                    }
                    setShortenedUrlIdentifier(data.ok.url.shortenedUrl)
                    return data.ok
                case EitherType.bad:
                    toast.error(data.bad.message)
                    return false
            }
        },
    })

    const shortenHandler = () => {
        createUrlMapping.mutate({
            fromUrl: inputUrl,
            useCustomUrl: useCustomIdentifier,
            toCustomUrl: inputShortenedUrlIdentifier,
        })
    }

    const shortendUrl = useMemo(
        () =>
            new URL(`api/${shortenedUrlIdentifier}`, env.NEXT_PUBLIC_BASE_URL)
                .href,
        [shortenedUrlIdentifier]
    )

    return (
        <div className="">
            <div className="dark:border-gray-700 bg-white dark:bg-gray-800 shadow md:mt-0 xl:p-0 dark:border rounded-lg w-full sm:max-w-md">
                <div className="flex flex-col items-center gap-5 mx-10 mb-6 pt-5">
                    <div className="flex flex-col items-start gap-3 w-96">
                        <div className="flex items-end gap-3">
                            <div>
                                <Text>Enter a URL to shorten:</Text>
                                <TextInput
                                    className="w-96"
                                    value={inputUrl}
                                    onChange={(e) =>
                                        setInputUrl(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center mb-4">
                                <input
                                    id="default-radio-1"
                                    type="radio"
                                    checked={!useCustomIdentifier}
                                    onChange={() =>
                                        setUseCustomIdentifier(false)
                                    }
                                    value=""
                                    name="default-radio"
                                    className="border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 w-4 h-4 text-blue-600 dark:ring-offset-gray-800"
                                />
                                <label
                                    htmlFor="default-radio-1"
                                    className="ml-2 font-medium text-gray-900 text-sm dark:text-gray-300"
                                >
                                    Randomly Generate Short URL
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="default-radio-2"
                                    checked={useCustomIdentifier}
                                    onChange={() =>
                                        setUseCustomIdentifier(true)
                                    }
                                    type="radio"
                                    value=""
                                    name="default-radio"
                                    className="border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 w-4 h-4 text-blue-600 dark:ring-offset-gray-800"
                                />
                                <label
                                    htmlFor="default-radio-2"
                                    className="ml-2 font-medium text-gray-900 text-sm dark:text-gray-300"
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
                                        setInputShortenedUrlIdentifier(
                                            e.target.value
                                        )
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
            </div>
        </div>
    )
}

export default ShortenService
