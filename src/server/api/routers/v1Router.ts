import { getUrl } from "@trpc/client/dist/links/internals/httpUtils"
import { get } from "http"
import { z } from "zod"

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc"
import {
    createUrlSchema,
    createUrlUseCase,
} from "~/server/useCase/url/createUrlUseCase"
import {
    getUrlsSchema,
    getUrlsUseCase,
} from "~/server/useCase/url/getUrlsUseCase"
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

    urlExists: protectedProcedure
        .input(urlExistsSchema)
        .query(async ({ ctx, input }) => {
            return await urlExistsUseCase.implement(input)
        }),

    urlExistsMutation: protectedProcedure
        .input(urlExistsSchema)
        .mutation(async ({ ctx, input }) => {
            return await urlExistsUseCase.implement(input)
        }),

    createUrl: protectedProcedure
        .input(createUrlSchema)
        .mutation(async ({ ctx, input }) => {
            return await createUrlUseCase.implement({
                ...input,
                auth: { user: ctx.session.user },
            })
        }),

    getUrls: protectedProcedure.query(async ({ ctx }) => {
        return await getUrlsUseCase.implement({
            auth: { user: ctx.session.user },
        })
    }),
})
