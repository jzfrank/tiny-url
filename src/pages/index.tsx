import { signIn, signOut, useSession } from "next-auth/react"
import ShortenService from "~/components/ShortenService"

export default function Home() {
    const { data: session } = useSession()

    return (
        <>
            {session ? (
                <>
                    <ShortenService />
                    <button
                        className="border-1 bg-red-400 hover:bg-red-300 p-1 border-black rounded-md"
                        onClick={() => void signOut()}
                    >
                        Sign out
                    </button>
                </>
            ) : (
                <>
                    <button
                        className="border-1 bg-blue-400 hover:bg-blue-300 p-1 border-black rounded-md"
                        onClick={() => void signIn()}
                    >
                        Sign in
                    </button>
                </>
            )}
        </>
    )
}
