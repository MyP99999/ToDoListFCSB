'use client'
import { signUpWithCredentials } from "@/actions/authActions"
import Button from "../Global/Button"
import Form from "../Global/Form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { FaEnvelope, FaUser, FaLock, FaPhone } from 'react-icons/fa';

const SignUp = () => {
    const { data: session } = useSession();
    const router = useRouter()

    if (session) {
        router.push('/')
    }

    async function handleSignUpCredentials(formData) {
        const name = formData.get('name')
        const email = formData.get('email')
        const phone = formData.get('phone')
        const password = formData.get('password')

        const res = await signUpWithCredentials({ name, email, phone, password })
        if (res?.msg) alert(res?.msg)
    }

    return (
        <div className="h-full flex flex-col justify-center items-center p-4 bg-white">
            <div className="w-full flex flex-col justify-center items-center h-full max-w-md">
                <h2 className="text-3xl text-center font-bold mb-8 text-red-500">Create a New Account!</h2>
                <Form action={handleSignUpCredentials} className="w-full flex flex-col text-center">

                    {/* Email Field */}
                    <div className="flex border-b-2 text-xl bg-transparent border-red-400 py-2 mb-4">
                        <FaEnvelope className="text-red-500 w-6 h-5 mr-2" />
                        <input className="bg-transparent w-full focus:outline-none" type="email" name="email" placeholder="Enter your email address" required />
                    </div>

                    {/* Name Field */}
                    <div className="flex border-b-2 text-xl bg-transparent border-red-400 py-2 mb-4">
                        <FaUser className="text-red-500 w-6 h-5 mr-2" />
                        <input className="bg-transparent w-full focus:outline-none" type="text" name="name" placeholder="Enter your name" required />
                    </div>

                    {/* Phone Field */}
                    <div className="flex border-b-2 text-xl bg-transparent border-red-400 py-2 mb-4">
                        <FaPhone className="text-red-500 w-6 h-5 mr-2" />
                        <input className="bg-transparent w-full focus:outline-none" type="text" name="phone" placeholder="Enter your phone number" required />
                    </div>

                    {/* Password Field */}
                    <div className="flex border-b-2 text-xl bg-transparent border-red-400 py-2 mb-6">
                        <FaLock className="text-red-500 w-6 h-5 mr-2" />
                        <input className="bg-transparent w-full focus:outline-none" type="password" name="password" placeholder="Enter your password" required />
                    </div>

                    <Button
                        value="Sign Up"
                        className="w-1/2 mx-auto mb-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                    />
                </Form>

                <div className="mt-4 text-center">
                    <h1 className="font-semibold text-lg mb-4">Or Continue With</h1>
                    <button
                        onClick={() => signIn("google", { callbackUrl })}
                        className="w-full cursor-pointer hover:scale-110 duration-200 p-4 text-center font-semibold text-gray-800 flex items-center justify-center gap-2"                    >
                        <Image
                            src="/google.png"
                            alt="Google Icon"
                            width={30}
                            height={30}
                            className="object-contain"
                        />
                    </button>
                </div>
            </div>
        </div>
    );

};


export default SignUp