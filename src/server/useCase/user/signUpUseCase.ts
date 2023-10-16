import { z } from "zod"
import { type ApiErrorResponse, type BaseErrors, BaseUseCase } from "../common"
import { type User } from "@prisma/client"
import { type Either, EitherType } from "~/common/Either"
import { prisma } from "~/server/db"

export const signUpSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
})

type SignUpRequest = z.infer<typeof signUpSchema>
type SignUpResponse = {
    user: User
}

class SignUpUseCase extends BaseUseCase<
    SignUpRequest,
    SignUpResponse,
    BaseErrors
> {
    async implement(
        props: SignUpRequest
    ): Promise<Either<ApiErrorResponse<BaseErrors>, SignUpResponse>> {
        const oldUser = await prisma.user.findUnique({
            where: {
                email: props.email,
            },
        })
        if (oldUser) {
            return {
                type: EitherType.bad,
                bad: {
                    type: "Bad input",
                    message: "User already exists",
                },
            }
        }
        const newUser = await prisma.user.create({
            data: {
                name: props.username,
                email: props.email,
                password: props.password,
            },
        })
        if (!newUser) {
            return {
                type: EitherType.bad,
                bad: {
                    type: "Internal error",
                    message: "Failed to create user",
                },
            }
        }
        return {
            type: EitherType.ok,
            ok: {
                user: newUser,
            },
        }
    }
}

export const signUpUseCase = new SignUpUseCase()
