import { signIn, signOut, useSession } from "next-auth/react"
import ShortenedViewer from "~/components/ShortenedViewer"
import ShortenService from "~/components/ShortenService"

export default function Home() {
    const { data: session } = useSession()

    return (
        <>
            {session ? (
                <div className="flex flex-col items-center gap-5 py-20">
                    <ShortenService />
                    <ShortenedViewer />
                </div>
            ) : (
                <div className="flex">
                    <button
                        className="border-1 bg-blue-400 hover:bg-blue-500 mt-20 px-8 p-4 border-black rounded-md font-bold text-lg text-white"
                        onClick={() => void signIn()}
                    >
                        Sign in
                    </button>
                </div>
            )}
        </>
    )
}
