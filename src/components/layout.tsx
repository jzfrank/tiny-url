import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    )
}
