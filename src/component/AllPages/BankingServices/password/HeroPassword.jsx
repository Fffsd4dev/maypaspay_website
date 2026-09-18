import { Link } from "react-router-dom";

export default function HeroPassword() {
  return (
    <>
        <div className=" py-15 sm:py-20 md:px-30 lg:py-57">
            <div className="container">
                <div className="">
                    <div className=" w-18 md:w-21.5 h-18 md:h-21.5 rounded-full bg-primary flex justify-center items-center text-center m-auto">
                        <svg className="" width="39" height="46" viewBox="0 0 39 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.5833 16.146V13.4166C32.5833 6.00686 26.5765 0 19.1666 0C11.7568 0 5.75 6.00686 5.75 13.4166V16.146C2.26173 17.6684 0.00503125 21.1107 0 24.9166V36.4166C0.00628906 41.7067 4.29318 45.9937 9.58327 46H28.7499C34.04 45.9937 38.3269 41.7067 38.3333 36.4166V24.9166C38.3283 21.1107 36.0715 17.6684 32.5833 16.146ZM21.0833 32.5834C21.0833 33.6419 20.2252 34.5 19.1666 34.5C18.1081 34.5 17.25 33.6419 17.25 32.5834V28.75C17.25 27.6915 18.1081 26.8334 19.1666 26.8334C20.2252 26.8334 21.0833 27.6915 21.0833 28.75V32.5834ZM28.75 15.3334H9.58327V13.4167C9.58327 8.12403 13.8739 3.83336 19.1666 3.83336C24.4594 3.83336 28.75 8.12394 28.75 13.4167V15.3334Z" fill="#0D0D0D"/>
                        </svg>
                    </div>
                    <div className=" mt-6 md:mt-10 max-w-150 md:max-w-170 m-auto text-center">
                        <h3>Password Protected</h3>
                        <p className="mt-4 text-lg ">Access is strictly restricted to authorized users only. Please securely log in or verify your credentials to continue. If you believe this is a error, contact support.</p>
                    </div>
                    <div className="max-w-100 md:max-w-116.5 mt-8 text-center m-auto">
                        <div className="flex items-center  justify-center gap-2 sm:gap-4 w-full flex-wrap">
                            <input type="password" placeholder="Type your password" className="flex-1 px-3.5 sm:px-4.5 py-3.5 outline-none  text-base font-normal placeholder:text-paragraph_black  bg-white  rounded-full border border-border leading-0 duration-300 ease-in-out focus:border-secondary max-w-full"/>
                            <button type="button" className="button-autline-primary min-h-12">
                                Login
                            </button>
                        </div>
                        <div className="flex items-center mt-4 justify-center">
                            <p className="flex flex-col sm:flex-row gap-1 items-center text-paragraph_black">Donâ€™t have an account? Back to
                                <Link to="/" className="flex gap-1 items-center text-paragraph_black font-normal duration-300 ease-in-out hover:text-secondary underline hover:font-medium">
                                    Homepage
                                    <span>
                                        <svg className="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.2881 5.47188L5.21968 3.84585C5.05153 3.79868 4.92645 3.70463 4.84442 3.56372C4.7624 3.42281 4.74429 3.26709 4.79009 3.09656C4.83769 2.92366 4.93125 2.79643 5.07076 2.71488C5.21027 2.63333 5.36604 2.61661 5.53807 2.66472L12.9015 4.63775C13.0053 4.66354 13.0943 4.70504 13.1685 4.76227C13.2427 4.8195 13.3049 4.89154 13.355 4.9784C13.4052 5.06525 13.4365 5.15512 13.4489 5.248C13.4614 5.34088 13.4535 5.43988 13.4253 5.54501L11.4523 12.9085C11.4092 13.0692 11.3168 13.1921 11.1751 13.2771C11.0334 13.3621 10.8765 13.3832 10.7043 13.3403C10.5324 13.2923 10.4057 13.1979 10.3244 13.0571C10.2432 12.9164 10.2248 12.7596 10.2692 12.5867L11.8964 6.52542L3.45619 11.3984C3.31235 11.4814 3.15913 11.5011 2.99652 11.4574C2.83398 11.4139 2.7105 11.319 2.62608 11.1727C2.54166 11.0265 2.52155 10.8727 2.56576 10.7113C2.61003 10.55 2.70409 10.4279 2.84792 10.3448L11.2881 5.47188Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}
