import { type AppProps, type AppType } from "next/app"
import { api } from "~/utils/api"
import "~/styles/globals.css"
import Layout from "~/components/Layout"
import { createContext, useState } from "react"
import { SessionProvider, useSession } from "next-auth/react"
import { Session } from "next-auth"

export type User = {
    isLogin: boolean
    email: string
    name: string
}

export type SetUser = React.Dispatch<React.SetStateAction<User>>

export const DEFAULT_USER: User = {
    isLogin: false,
    email: "",
    name: "",
}

export type UserContextType = {
    user: User
    setUser: SetUser
}

const DEFAULT_USER_CONTEXT: UserContextType = {
    user: DEFAULT_USER,
    setUser: (value) => {
        // circuvent type error
    },
}

export const UserContext = createContext(DEFAULT_USER_CONTEXT)

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    const [user, setUser] = useState(DEFAULT_USER)

    return (
        <SessionProvider session={session}>
            <UserContext.Provider value={{ user, setUser }}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </UserContext.Provider>
        </SessionProvider>
    )
}

export default api.withTRPC(MyApp)
