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
import { LoginSchema, loginUseCase } from "~/server/useCase/user/loginUseCase"

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

    login: publicProcedure
        .input(LoginSchema)
        .mutation(async ({ ctx, input }) => {
            return await loginUseCase.implement(input)
        }),
})
