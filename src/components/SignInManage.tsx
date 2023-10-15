import { useState } from "react"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import { type SetUser } from "~/pages/_app"

type Props = {
    setUser: SetUser
}

const SignInManage = (props: Props) => {
    const { setUser } = props
    const [hasAccount, setHasAccount] = useState(true)
    return (
        <div>
            {hasAccount ? (
                <SignIn setHasAccount={setHasAccount} setUser={setUser} />
            ) : (
                <SignUp setHasAccount={setHasAccount} setUser={setUser} />
            )}
        </div>
    )
}

export default SignInManage
