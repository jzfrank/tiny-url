import { z } from "zod"
import { type ApiErrorResponse, type BaseErrors, BaseUseCase } from "../common"
import { type Either, EitherType } from "~/common/Either"
import { prisma } from "~/server/db"

export const urlExistsSchema = z.object({
    url: z.string(),
})

type UrlExistsRequest = z.infer<typeof urlExistsSchema>
type UrlExistsResponse = {
    exists: boolean
    shortenedId: string
}

class UrlExistsUseCase extends BaseUseCase<
    UrlExistsRequest,
    UrlExistsResponse,
    BaseErrors
> {
    async implement(
        props: UrlExistsRequest
    ): Promise<Either<ApiErrorResponse<BaseErrors>, UrlExistsResponse>> {
        const { url: inputUrl } = props
        const url = await prisma.url.findFirst({
            where: {
                url: inputUrl,
            },
        })
        if (url) {
            return {
                type: EitherType.ok,
                ok: {
                    exists: true,
                    shortenedId: url.shortenedUrl,
                },
            }
        } else {
            return {
                type: EitherType.ok,
                ok: {
                    exists: false,
                    shortenedId: "",
                },
            }
        }
    }
}

export const urlExistsUseCase = new UrlExistsUseCase()
