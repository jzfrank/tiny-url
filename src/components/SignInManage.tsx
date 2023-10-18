import { useState } from "react"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import { type SetUser } from "~/pages/_app"

type Props = {
    setUser: SetUser
    setForgetPassword: React.Dispatch<React.SetStateAction<boolean>>
}

const SignInManage = (props: Props) => {
    const { setUser, setForgetPassword } = props
    const [hasAccount, setHasAccount] = useState(true)
    return (
        <div>
            {hasAccount ? (
                <SignIn
                    setHasAccount={setHasAccount}
                    setUser={setUser}
                    setForgetPassword={setForgetPassword}
                />
            ) : (
                <SignUp setHasAccount={setHasAccount} setUser={setUser} />
            )}
        </div>
    )
}

export default SignInManage
