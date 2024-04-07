import { type NextApiHandler } from "next"
import { z } from "zod"
import { env } from "~/env.mjs"
import { prisma } from "~/server/db"

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
        // Test if url starts with http:// or https://
        if (!/^https?:\/\//i.test(url.url)) {
            return res.redirect("http://" + url.url)
        }
        return res.redirect(url.url)
    }
}

export default RediectHandler
