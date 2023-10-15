import { literal, z } from "zod"
import { type ApiErrorResponse, type BaseErrors, BaseUseCase } from "../common"
import { type Either, EitherType } from "~/common/Either"
import { prisma } from "~/server/db"
import { type Url } from "@prisma/client"
import { isValidUrl, shortenUrlIdentifier } from "~/common/utils"

const MAX_TRIES = 5 as const

export const createUrlSchema = z.object({
    fromUrl: z.string(),
    useCustomUrl: z.boolean(),
    toCustomUrl: z.string(),
})

type CreateUrlRequest = z.infer<typeof createUrlSchema>
type CreateUrlResponse = {
    created: boolean
    url: Url
}

class CreateUrlUseCase extends BaseUseCase<
    CreateUrlRequest,
    CreateUrlResponse,
    BaseErrors
> {
    async implement(
        props: CreateUrlRequest
    ): Promise<Either<ApiErrorResponse<BaseErrors>, CreateUrlResponse>> {
        const { fromUrl, useCustomUrl, toCustomUrl } = props
        if (!isValidUrl(fromUrl)) {
            return {
                type: EitherType.bad,
                bad: {
                    type: "Bad input",
                    message: `Invalid url ${fromUrl}`,
                },
            }
        }
        const oldUrl = await prisma.url.findUnique({
            where: {
                url: fromUrl,
            },
        })
        if (oldUrl) {
            return {
                type: EitherType.ok,
                ok: { created: false, url: oldUrl },
            }
        }
        if (useCustomUrl) {
            const oldUrl = await prisma.url.findUnique({
                where: {
                    shortenedUrl: toCustomUrl,
                },
            })
            if (oldUrl) {
                return {
                    type: EitherType.bad,
                    bad: {
                        type: "Bad input",
                        message: `Target url ${fromUrl} already exists`,
                    },
                }
            }
            const url = await prisma.url.create({
                data: {
                    url: fromUrl,
                    shortenedUrl: toCustomUrl,
                },
            })
            if (url) {
                return {
                    type: EitherType.ok,
                    ok: { created: true, url: url },
                }
            }
            return {
                type: EitherType.bad,
                bad: {
                    type: "Not found",
                    message: `Target url ${fromUrl} not found`,
                },
            }
        } else {
            for (let i = 0; i < MAX_TRIES; i++) {
                const shortendUrlId = shortenUrlIdentifier()
                const oldUrl = await prisma.url.findUnique({
                    where: {
                        shortenedUrl: shortendUrlId,
                    },
                })
                if (!oldUrl) {
                    const url = await prisma.url.create({
                        data: {
                            url: fromUrl,
                            shortenedUrl: shortendUrlId,
                        },
                    })
                    if (url) {
                        return {
                            type: EitherType.ok,
                            ok: { created: true, url: url },
                        }
                    }
                }
            }
            return {
                type: EitherType.bad,
                bad: {
                    type: "Internal error",
                    message: `Failed to create ${fromUrl} after ${MAX_TRIES} tries`,
                },
            }
        }
    }
}

export const createUrlUseCase = new CreateUrlUseCase()
