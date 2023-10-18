import { Button, Text, Title } from "@tremor/react"
import { useState } from "react"
import { toast } from "react-toastify"
import { EitherType } from "~/common/Either"
import { SetUser } from "~/pages/_app"
import { api } from "~/utils/api"
import { useSession, signIn as signInNextAuth, signOut } from "next-auth/react"

type Props = {
    setUser: SetUser
    setHasAccount: React.Dispatch<React.SetStateAction<boolean>>
}

const SignIn = (props: Props) => {
    const { setHasAccount, setUser } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = api.v1Router.signIn.useMutation({
        onSuccess(data) {
            switch (data.type) {
                case EitherType.ok:
                    toast.success("Successfully logged in")
                    setUser({
                        isLogin: true,
                        email: data.ok.user.email,
                        name: data.ok.user.name,
                    })
                    return data.ok
                case EitherType.bad:
                    toast.error(data.bad.message)
                    return false
            }
        },
        onError(err) {
            toast.error(err.message)
        },
    })

    const signInHandler = () => {
        signIn.mutate({ email, password })
    }

    return (
        <div className="pt-36">
            <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                        Sign in to your account
                    </h1>
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start"></div>
                            <a
                                href="#"
                                className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <Button className="w-48" onClick={signInHandler}>
                                Sign in
                            </Button>
                        </div>

                        <div className="flex justify-center ">
                            <Button
                                className="w-48 bg-black hover:bg-cyan-950"
                                onClick={() => void signInNextAuth()}
                            >
                                Sign in with Google
                            </Button>
                        </div>
                        <div className="flex gap-2 text-sm font-light text-gray-500 dark:text-gray-400">
                            <span>Don’t have an account yet?</span>
                            <button
                                className="dark:text-primary-500 font-medium text-blue-400 hover:cursor-pointer"
                                onClick={() => setHasAccount(false)}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
