import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import {
    createUrlSchema,
    createUrlUseCase,
} from "~/server/useCase/url/createUrlUseCase"
import {
    urlExistsSchema,
    urlExistsUseCase,
} from "~/server/useCase/url/urlExistsUseCase"
import {
    findPasswordSchema,
    findPasswordUseCase,
} from "~/server/useCase/user/findPasswordUseCase"
import {
    signInSchema,
    signInUseCase,
} from "~/server/useCase/user/signInUseCase"
import {
    signUpSchema,
    signUpUseCase,
} from "~/server/useCase/user/signUpUseCase"

export const v1Router = createTRPCRouter({
    health: publicProcedure.input(z.string().optional()).query(() => {
        return {
            status: "ok",
        }
    }),

    urlExists: publicProcedure
        .input(urlExistsSchema)
        .query(async ({ ctx, input }) => {
            return await urlExistsUseCase.implement(input)
        }),

    urlExistsMutation: publicProcedure
        .input(urlExistsSchema)
        .mutation(async ({ ctx, input }) => {
            return await urlExistsUseCase.implement(input)
        }),

    createUrl: publicProcedure
        .input(createUrlSchema)
        .mutation(async ({ ctx, input }) => {
            return await createUrlUseCase.implement(input)
        }),

    signIn: publicProcedure
        .input(signInSchema)
        .mutation(async ({ ctx, input }) => {
            return await signInUseCase.implement(input)
        }),

    signUp: publicProcedure
        .input(signUpSchema)
        .mutation(async ({ ctx, input }) => {
            return await signUpUseCase.implement(input)
        }),

    findPassword: publicProcedure
        .input(findPasswordSchema)
        .mutation(async ({ ctx, input }) => {
            return await findPasswordUseCase.implement(input)
        }),
})
