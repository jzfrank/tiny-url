import { Text } from "@tremor/react"
import { signOut, useSession } from "next-auth/react"
import { useContext } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { DEFAULT_USER, UserContext } from "~/pages/_app"

export default function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const { data: session } = useSession()
    const { user, setUser } = useContext(UserContext)
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 h-screen">
                <nav className="border-gray-200 bg-white dark:bg-gray-900">
                    <div className="flex flex-wrap justify-between items-center mx-auto p-4 max-w-screen-xl">
                        <div className="flex items-center gap-3">
                            <a
                                className="font-bold text-2xl dark:text-white whitespace-nowrap self-center"
                                href="#"
                            >
                                TinyRedirect
                            </a>
                        </div>
                        <div className="flex items-center gap-8">
                            <button
                                data-collapse-toggle="navbar-default"
                                type="button"
                                className="inline-flex justify-center items-center md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg w-10 h-10 text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
                                aria-controls="navbar-default"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="w-5 h-5"
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
                                className="md:block hidden w-full md:w-auto"
                                id="navbar-default"
                            >
                                <ul className="flex md:flex-row flex-col items-center md:space-x-8 border-gray-100 md:border-0 dark:border-gray-700 bg-gray-50 md:bg-white md:dark:bg-gray-900 dark:bg-gray-800 mt-4 md:mt-0 p-4 md:p-0 border rounded-lg font-medium">
                                    <li>
                                        <a
                                            href="#"
                                            className="block md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 py-2 md:p-0 pr-4 pl-3 rounded text-gray-900 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:text-white dark:text-white"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 py-2 md:p-0 pr-4 pl-3 rounded text-gray-900 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:text-white dark:text-white"
                                        >
                                            Pricing
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 py-2 md:p-0 pr-4 pl-3 rounded text-gray-900 md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:text-white dark:text-white"
                                        >
                                            Contact
                                        </a>
                                    </li>
                                    {session && (
                                        <li>
                                            <button
                                                onClick={() => void signOut()}
                                                className="block bg-red-400 hover:bg-red-500 dark:hover:bg-gray-700 px-2 p-1 rounded text-white"
                                            >
                                                Sign Out
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="flex flex-col items-start">
                                {user.isLogin && (
                                    <>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs">
                                                Logged in as
                                            </span>
                                            <span className="font-semibold text-sm">
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
                <div className="flex flex-col items-center mx-auto px-6">
                    {children}
                </div>
                <ToastContainer />
            </section>
        </>
    )
}
