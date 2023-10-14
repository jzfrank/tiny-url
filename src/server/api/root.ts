import { createTRPCRouter } from "~/server/api/trpc"
import { v1Router } from "./routers/v1Router"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    v1Router: v1Router,
})

// export type definition of API
export type AppRouter = typeof appRouter
