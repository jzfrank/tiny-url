import { Button, Text, TextInput, Title } from "@tremor/react"
import { useRouter } from "next/router"
import { useState } from "react"

const urlIsValid = (url: string) => {
    return url.trim().length > 0
}

export default function Home() {
    const router = useRouter()
    const [inputUrl, setInputUrl] = useState("")
    const [shortenedUrl, setShortenedUrl] = useState("")
    const shortenUrl = (url: string) => {
        return "1"
    }

    const shortenHandler = () => {
        setShortenedUrl(shortenUrl(inputUrl))
        setInputUrl("")
    }

    const redirectHandler = () => {
        void router.push("/api")
    }

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
                    {urlIsValid(shortenedUrl) && (
                        <Text>Shortened URL: {shortenedUrl}</Text>
                    )}
                    <Button className="w-24" onClick={redirectHandler}>
                        Check
                    </Button>
                </div>
            </div>
        </div>
    )
}
