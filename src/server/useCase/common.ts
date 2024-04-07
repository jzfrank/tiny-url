import { type Either } from "~/common/Either"

export type ApiErrorResponse<T> = {
    type: T
    message: string
}
export type UseCaseProps<T> = T & AuthProps

export type AuthProps = {
    auth: {
        user: {
            id: string
        }
    }
}

export abstract class BaseUseCase<TIn, TOut, TErrors> {
    abstract implement(
        props: TIn
    ): Promise<Either<ApiErrorResponse<TErrors>, TOut>>
}

export type BaseErrors = "Bad input" | "Not found" | "Internal error"
