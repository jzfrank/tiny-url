/* eslint-disable @typescript-eslint/no-unsafe-call */
import NextAuth from "next-auth/next"
import { authOptions } from "~/server/auth"

export default NextAuth(authOptions)
