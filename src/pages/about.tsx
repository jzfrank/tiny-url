import React from "react"

const About = () => {
    return (
        <div className="mt-20 flex flex-col gap-5">
            <div className="text-gray-500">
                A URL shortener service. User can log in with Github account.
                User could enter a url and shorten it. It is implemented in
                NextJS.
            </div>
            <div className="text-gray-500">
                User can either randomly generate a shortened url or enter a
                custom one.
            </div>
        </div>
    )
}

export default About
