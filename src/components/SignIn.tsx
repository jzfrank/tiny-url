import { Button, Text, Title } from "@tremor/react"
import { useState } from "react"
import { toast } from "react-toastify"
import { EitherType } from "~/common/Either"
import { api } from "~/utils/api"

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = api.v1Router.login.useMutation({
        onSuccess(data) {
            switch (data.type) {
                case EitherType.ok:
                    toast.success("Successfully logged in")
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
        login.mutate({ email, password })
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                <Title className="mb-6 flex items-center text-4xl font-bold text-gray-900 dark:text-white">
                    TinyRedirect Service
                </Title>
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
                                <Button
                                    className="w-64"
                                    onClick={signInHandler}
                                >
                                    Sign in
                                </Button>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <a
                                    href="#"
                                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                                >
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn
