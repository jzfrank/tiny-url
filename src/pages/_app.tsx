import { type AppType } from "next/app"

import { api } from "~/utils/api"

import "~/styles/globals.css"
import Layout from "~/components/Layout"
import { createContext, useState } from "react"

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

type UserContextType = {
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

const MyApp: AppType = ({ Component, pageProps }) => {
    const [user, setUser] = useState(DEFAULT_USER)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserContext.Provider>
    )
}

export default api.withTRPC(MyApp)
