/* eslint-disable @typescript-eslint/no-unsafe-call */
import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import { env } from "~/env.mjs"
import { authOptions } from "~/server/auth"

export default NextAuth(authOptions)
