"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting after successful login
import { LoginNavbar } from "../components/LoginNavbar";
import Particles from "../components/particles";

export default function CustomLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const loginHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        setIsLoading(true);
        setError(null); 

        const res = await signIn("google", { redirect: true, callbackUrl: "/" });  

        if (res?.error) {
            console.log("Failed to log in. Please try again.");
            setError("Failed to log in. Please try again.");
            setIsLoading(false);
        }
    };
    return (
        <div className="bg-[#08090a] overflow-hidden relative h-screen">



            <div className="absolute w-full my-auto h-full">
                <div className="text-white  pt-20 geist-sans flex flex-col gap-y-5 h-[80%] items-center justify-center">
                    <p className="text-[30px] "> Login to Portify </p>

                    <div className="p-2" onClick={loginHandler}>
                        <button
                            type="button"
                            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                        >
                            <svg
                                className="w-4 h-4 me-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 19"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>


            <LoginNavbar />

            <Particles />

        </div>
    );
}
