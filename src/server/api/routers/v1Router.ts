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
        
    createUrl: publicProcedure
        .input(createUrlSchema)
        .mutation(async ({ ctx, input }) => {
            return await createUrlUseCase.implement(input)
        }),
})
