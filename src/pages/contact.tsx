import React from "react"

const Contact = () => {
    return (
        <div>
            <section className="dark:bg-gray-900">
                <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
                    <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Contact Us
                    </h2>
                    <p className="mb-8 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
                        Got a technical issue? Want to send feedback about a
                        beta feature? Need details about our Business plan? Let
                        us know.
                    </p>
                    <form action="#" className="space-y-8">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="focus:border-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light focus:ring-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                placeholder="name@domain.com"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="subject"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="focus:border-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light focus:ring-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                placeholder="Let us know how we can help you"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
                            >
                                Your message
                            </label>
                            <textarea
                                id="message"
                                className="focus:border-primary-500 dark:focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                                placeholder="Leave a comment..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-primary-700 hover:bg-primary-800 dark:hover:bg-primary-700 dark:bg-primary-600 focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg px-5 py-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-fit"
                        >
                            Send message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Contact
