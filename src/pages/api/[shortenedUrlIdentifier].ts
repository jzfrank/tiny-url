import { type NextApiHandler } from "next"
import { useRouter } from "next/router"
import { z } from "zod"
import { env } from "~/env.mjs"
import { prisma } from "~/server/db"
import { api } from "~/utils/api"

const querySchema = z.object({
    shortenedUrlIdentifier: z.string(),
})

const RediectHandler: NextApiHandler = async (req, res) => {
    const valid = querySchema.safeParse(req.query)
    if (!valid.success) {
        return res.status(400).json({
            success: false,
            error: valid.error,
        })
    }
    const { shortenedUrlIdentifier } = valid.data

    const url = await prisma.url.findUnique({
        where: {
            shortenedUrl: shortenedUrlIdentifier,
        },
    })

    if (!url) {
        return res.redirect(env.NEXT_PUBLIC_BASE_URL)
    } else {
        return res.redirect(url.url)
    }
}

export default RediectHandler
