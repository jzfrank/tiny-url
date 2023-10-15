import { z } from "zod"
import { ApiErrorResponse, BaseErrors, BaseUseCase } from "../common"
import { Either, EitherType } from "~/common/Either"
import { prisma } from "~/server/db"
import { User } from "@prisma/client"

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

type SignInRequest = z.infer<typeof signInSchema>

type SignInResponse = {
    user: User
}

class SignInUseCase extends BaseUseCase<
    SignInRequest,
    SignInResponse,
    BaseErrors
> {
    async implement(
        props: SignInRequest
    ): Promise<Either<ApiErrorResponse<BaseErrors>, SignInResponse>> {
        const user = await prisma.user.findUnique({
            where: {
                email: props.email,
            },
        })
        if (!user) {
            return {
                type: EitherType.bad,
                bad: {
                    type: "Bad input",
                    message: "User not found",
                },
            }
        }
        // TODO: hash password
        if (user.password !== props.password) {
            return {
                type: EitherType.bad,
                bad: {
                    type: "Bad input",
                    message: "Password is incorrect",
                },
            }
        }
        return {
            type: EitherType.ok,
            ok: {
                user,
            },
        }
    }
}

export const signInUseCase = new SignInUseCase()
