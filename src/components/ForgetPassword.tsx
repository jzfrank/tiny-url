import { Button, Subtitle, Text } from "@tremor/react"
import { useState } from "react"
import { toast } from "react-toastify"
import { EitherType } from "~/common/Either"
import { api } from "~/utils/api"

type Props = {
    setForgetPassword: React.Dispatch<React.SetStateAction<boolean>>
}

const ForgetPassword = (props: Props) => {
    const { setForgetPassword } = props
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const findPassword = api.v1Router.findPassword.useMutation({
        onSuccess(data) {
            switch (data.type) {
                case EitherType.ok:
                    setPassword(data.ok.password)
                    toast.success("Found password!")
                    return data.ok
                case EitherType.bad:
                    setPassword("")
                    toast.error(data.bad.message)
                    return false
            }
        },
        onError(err) {
            toast.error(err.message)
        },
    })

    const findPasswordHandler = () => {
        findPassword.mutate({ email, name })
    }

    return (
        <div className="pt-36">
            <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
                <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                        Find your password
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
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your name
                            </label>
                            <input
                                name="name"
                                id="name"
                                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                placeholder="name@company.com"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-center">
                            <Button
                                className="w-64"
                                onClick={findPasswordHandler}
                            >
                                Find my password
                            </Button>
                        </div>
                        {password.length > 0 && (
                            <div className="flex items-center gap-3">
                                <Text>Your password:</Text>
                                <Subtitle>{password}</Subtitle>
                            </div>
                        )}
                        <div className="flex justify-end">
                            <Button
                                className="bg-black hover:bg-cyan-900"
                                onClick={() => setForgetPassword(false)}
                            >
                                Back to login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgetPassword
