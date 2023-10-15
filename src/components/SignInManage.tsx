import { useState } from "react"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

const SignInManage = () => {
    const [hasAccount, setHasAccount] = useState(true)
    return (
        <div>
            {hasAccount ? (
                <SignIn setHasAccount={setHasAccount} />
            ) : (
                <SignUp setHasAccount={setHasAccount} />
            )}
        </div>
    )
}

export default SignInManage
