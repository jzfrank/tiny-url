import { z } from "zod"
import { ApiErrorResponse, BaseErrors, BaseUseCase } from "../common"
import { Either, EitherType } from "~/common/Either"
import { prisma } from "~/server/db"
import { User } from "@prisma/client"

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

type LoginRequest = z.infer<typeof LoginSchema>

type LoginResponse = {
    user: User
}

class LoginUseCase extends BaseUseCase<
    LoginRequest,
    LoginResponse,
    BaseErrors
> {
    async implement(
        props: LoginRequest
    ): Promise<Either<ApiErrorResponse<BaseErrors>, LoginResponse>> {
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

export const loginUseCase = new LoginUseCase()
