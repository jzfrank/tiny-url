import { z } from "zod"
import { type ApiErrorResponse, type BaseErrors, BaseUseCase } from "../common"
import { type Either, EitherType } from "~/common/Either"
import { prisma } from "~/server/db"

export const urlExistsSchema = z.object({
    url: z.string(),
})

type UrlExistsRequest = z.infer<typeof urlExistsSchema>
type UrlExistsResponse = boolean

class UrlExistsUseCase extends BaseUseCase<
    UrlExistsRequest,
    UrlExistsResponse,
    BaseErrors
> {
    async implement(
        props: UrlExistsRequest
    ): Promise<Either<ApiErrorResponse<BaseErrors>, boolean>> {
        const { url: inputUrl } = props
        const url = await prisma.url.findUnique({
            where: {
                url: inputUrl,
            },
        })
        console.log({ url, inputUrl })
        if (url) {
            return {
                type: EitherType.ok,
                ok: true,
            }
        }
        return {
            type: EitherType.bad,
            bad: {
                type: "Not found",
                message: `Url ${inputUrl} not found`,
            },
        }
    }
}

export const urlExistsUseCase = new UrlExistsUseCase()