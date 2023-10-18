import { Text } from "@tremor/react"
import { useSession } from "next-auth/react"
import { useContext, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { DEFAULT_USER, UserContext } from "~/pages/_app"

export default function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const { data: session } = useSession()
    console.log({ session })
    const { user, setUser } = useContext(UserContext)
    useEffect(() => {
        if (session) {
            setUser({
                isLogin: session?.user?.email ? true : false,
                email: session?.user?.email ?? "",
                name: session?.user?.name ?? "",
            })
        }
    }, [session])

    return (
        <>
            <section className="h-screen bg-gray-50 dark:bg-gray-900">
                <nav className="border-gray-200 bg-white dark:bg-gray-900">
                    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">
                                TinyRedirect
                            </span>
                        </div>
                        <div className="flex items-center gap-8">
                            <button
                                data-collapse-toggle="navbar-default"
                                type="button"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                                aria-controls="navbar-default"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 17 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 1h15M1 7h15M1 13h15"
                                    />
                                </svg>
                            </button>
                            <div
                                className="hidden w-full md:block md:w-auto"
                                id="navbar-default"
                            >
                                <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                                        >
                                            Pricing
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                                        >
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-start">
                                {user.isLogin && (
                                    <>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs">
                                                Logged in as
                                            </span>
                                            <span className="text-sm font-semibold">
                                                {user.name}
                                            </span>
                                        </div>

                                        <Text>
                                            <button
                                                className="hover:text-slate-800"
                                                onClick={() =>
                                                    setUser(DEFAULT_USER)
                                                }
                                            >
                                                Sign out
                                            </button>
                                        </Text>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="mx-auto flex flex-col items-center px-6">
                    {children}
                </div>
                <ToastContainer />
            </section>
        </>
    )
}
