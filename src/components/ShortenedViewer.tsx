import React, { useEffect } from "react"
import { type Url } from "@prisma/client"
import { api } from "~/utils/api"
import { EitherType } from "~/common/Either"
import { env } from "~/env.mjs"

const ShortenedViewer = () => {
    const [urls, setUrls] = React.useState<Url[]>([])

    const getUrls = api.v1Router.getUrls.useQuery(undefined, {
        onSuccess: (data) => {
            switch (data.type) {
                case EitherType.ok:
                    setUrls(data.ok.urls)
                    break
                case EitherType.bad:
                    console.error(data.bad.message)
                    break
            }
        },
    })

    return (
        <div className="flex flex-col gap-3">
            <div className="text-gray-600">Shortened Urls:</div>
            <div className="text-gray-800 text-sm">
                <div className="grid grid-cols-12 bg-white rounded text-gray-800">
                    <span
                        rel="noreferrer"
                        className="col-span-8 bg-gray-100 px-4 py-2 font-bold"
                    >
                        original Url
                    </span>
                    <span className="col-span-4 bg-gray-50 px-4 py-2 font-bold">
                        shortened Url
                    </span>
                </div>
                {urls.map((url) => (
                    <div
                        key={url.id}
                        className="grid grid-cols-12 bg-white rounded"
                    >
                        <a
                            href={url.url}
                            target="_blank"
                            rel="noreferrer"
                            className="col-span-8 bg-gray-100 px-4 py-2 text-blue-500 hover:text-blue-600 hover:underline"
                        >
                            {url.url}
                        </a>
                        <a
                            href={
                                env.NEXT_PUBLIC_BASE_URL +
                                "/api/" +
                                url.shortenedUrl
                            }
                            className="col-span-4 bg-gray-50 px-4 py-2 text-blue-500 hover:text-blue-600 hover:underline"
                        >
                            {env.NEXT_PUBLIC_BASE_URL +
                                "/api/" +
                                url.shortenedUrl}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShortenedViewer
