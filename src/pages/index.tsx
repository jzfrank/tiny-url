import { useContext, useState } from "react"
import { UserContext } from "./_app"
import SignInManage from "~/components/SignInManage"
import ShortenService from "~/components/ShortenService"
import ForgetPassword from "~/components/ForgetPassword"

export default function Home() {
    const { user, setUser } = useContext(UserContext)
    const [forgetPassword, setForgetPassword] = useState(false)

    return (
        <>
            {forgetPassword && (
                <ForgetPassword setForgetPassword={setForgetPassword} />
            )}
            {!forgetPassword &&
                (!user.isLogin ? (
                    <SignInManage
                        setUser={setUser}
                        setForgetPassword={setForgetPassword}
                    />
                ) : (
                    <ShortenService />
                ))}
        </>
    )
}
