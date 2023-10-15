import { useContext } from "react"
import { UserContext } from "./_app"
import SignInManage from "~/components/SignInManage"
import ShortenService from "~/components/ShortenService"

export default function Home() {
    const { user, setUser } = useContext(UserContext)

    return (
        <>
            {!user.isLogin ? (
                <SignInManage setUser={setUser} />
            ) : (
                <ShortenService />
            )}
        </>
    )
}
