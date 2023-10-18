import { z } from "zod"
import { type ApiErrorResponse, type BaseErrors, BaseUseCase } from "../common"
import { type Either, EitherType } from "~/common/Either"
import { prisma } from "~/server/db"

export const findPasswordSchema = z.object({
    email: z.string().email(),
    name: z.string(),
})

type FindPasswordRequest = z.infer<typeof findPasswordSchema>

type FindPasswordResponse = {
    password: string
}

class FindPasswordUseCase extends BaseUseCase<
    FindPasswordRequest,
    FindPasswordResponse,
    BaseErrors
> {
    async implement(
        props: FindPasswordRequest
    ): Promise<Either<ApiErrorResponse<BaseErrors>, FindPasswordResponse>> {
        const { email, name } = props
        const user = await prisma.user.findUnique({
            where: {
                email,
                name,
            },
        })

        if (user) {
            return {
                type: EitherType.ok,
                ok: {
                    password: user.password,
                },
            }
        }

        return {
            type: EitherType.bad,
            bad: {
                type: "Bad input",
                message: "User not found",
            },
        }
    }
}

export const findPasswordUseCase = new FindPasswordUseCase()
