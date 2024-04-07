import { z } from "zod"
import {
    type ApiErrorResponse,
    type BaseErrors,
    BaseUseCase,
    UseCaseProps,
} from "../common"
import { type Either, EitherType } from "~/common/Either"
import { prisma } from "~/server/db"
import { Url } from "@prisma/client"

export const getUrlsSchema = z.object({})

type GetUrlsRequest = z.infer<typeof getUrlsSchema>
type GetUrlsResponse = {
    urls: Url[]
}

class GetUrlsUseCase extends BaseUseCase<
    GetUrlsRequest,
    GetUrlsResponse,
    BaseErrors
> {
    async implement(
        props: UseCaseProps<GetUrlsRequest>
    ): Promise<Either<ApiErrorResponse<BaseErrors>, GetUrlsResponse>> {
        const userId = props.auth.user.id
        const urls = await prisma.url.findMany({
            where: {
                userId,
            },
        })
        return {
            type: EitherType.ok,
            ok: {
                urls,
            },
        }
    }
}

export const getUrlsUseCase = new GetUrlsUseCase()
