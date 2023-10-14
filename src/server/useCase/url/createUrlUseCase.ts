import { z } from "zod"
import { type ApiErrorResponse, type BaseErrors, BaseUseCase } from "../common"
import { type Either, EitherType } from "~/common/Either"
import { prisma } from "~/server/db"
import { type Url } from "@prisma/client"

export const createUrlSchema = z.object({
    fromUrl: z.string(),
    toUrlIdentifier: z.string(),
})

type CreateUrlRequest = z.infer<typeof createUrlSchema>
type CreateUrlResponse = Url

class CreateUrlUseCase extends BaseUseCase<
    CreateUrlRequest,
    CreateUrlResponse,
    BaseErrors
> {
    async implement(
        props: CreateUrlRequest
    ): Promise<Either<ApiErrorResponse<BaseErrors>, CreateUrlResponse>> {
        const { fromUrl, toUrlIdentifier } = props
        const url = await prisma.url.create({
            data: {
                url: fromUrl,
                shortenedUrl: toUrlIdentifier,
            },
        })
        if (url) {
            return {
                type: EitherType.ok,
                ok: url,
            }
        }
        return {
            type: EitherType.bad,
            bad: {
                type: "Not found",
                message: `Url ${fromUrl} not found`,
            },
        }
    }
}

export const createUrlUseCase = new CreateUrlUseCase()
