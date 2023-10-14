import { NextApiHandler } from "next"

const RediectHandler: NextApiHandler = (req, res) => {
    return res.redirect("https://www.google.com")
}

export default RediectHandler
