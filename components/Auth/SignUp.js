'use client'
import { signUpWithCredentials } from "@/actions/authActions"
import Button from "../Global/Button"
import Form from "../Global/Form"
import Link from "next/link"
import Image from "next/image"


const SignUp = () => {

    async function handleSignUpCredentials(formData) {
        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')

        const res = await signUpWithCredentials({ name, email, password })
        if (res?.msg) alert(res?.msg)
    }

    return (
        <div className="body-bg-image flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>

            <div className="rainbow p-6 font-poppins min-w-[400px] min-h-[700px] text-[#FFFFFF] rounded-md">

                <h2 className="text-2xl font-semibold text-center">Register</h2>

                <div className="flex flex-col justify-center items-center text-[16px] gap-2 mt-8 font-semibold">
                    <h5>If you already have an account</h5>
                    <h5>You can <Link href='/signin' className="text-[#C10C99] font-bold hover:text-[#9C0C84] focus:outline-none">Login here!</Link></h5>
                </div>

                {/* SignIn with credentials */}
                <Form action={handleSignUpCredentials} className='my-12 flex flex-col gap-4'>
                    <div>
                        <label htmlFor="name" className="text-xs font-semibold">Name</label>
                        <div className="flex items-center mt-1 bg-[#050214] rounded">
                            <Image
                                src="/user.svg"
                                alt="message"
                                width={17} // Adjust the width as needed
                                height={12} // Adjust the height as needed
                                className="text-white"
                            />
                            <input className="bg-transparent ml-1 w-full font-poppins" type="text" name="name" placeholder="Enter your name" required />
                        </div>
                        <div className="mt-2 h-[2px] rounded-md w-full bg-white"></div> {/* White line */}
                    </div>
                    <div>
                        <label htmlFor="email" className="text-xs font-semibold">Email</label>
                        <div className="flex items-center mt-1 bg-[#050214] rounded">
                            <Image
                                src="/message.png"
                                alt="message"
                                width={17} // Adjust the width as needed
                                height={12} // Adjust the height as needed
                            />
                            <input className="bg-transparent ml-1 w-full font-poppins" type="email" name="email" placeholder="Enter your email address" required />
                        </div>
                        <div className="mt-2 h-[2px] rounded-md w-full bg-white"></div> {/* White line */}
                    </div>
                    <div>
                        <label htmlFor="password" className="text-xs font-semibold">Password</label>
                        <div className="flex items-center mt-1 bg-[#050214] rounded">
                            <Image
                                src="/padlock.png"
                                alt="message"
                                width={17} // Adjust the width as needed
                                height={12} // Adjust the height as needed
                            />
                            <input className="bg-[#050214] ml-1 w-full font-poppins" type="password" name="password" placeholder="Enter your password" required />
                        </div>
                        <div className="mt-2 h-[2px] rounded-md w-full bg-white"></div> {/* White line */}
                    </div>

                    <Button value='Sign Up' className="bg-[#C10C99] rounded-xl p-2 mt-6 mb-4 hover:bg-[#9C0C84] focus:outline-none" />
                </Form>

                <div className="flex flex-col items-center justify-center gap-2">
                    <h5 className="text-[16px] font-thin">or continue with</h5>
                    <Image
                        src="/google.png"
                        alt="message"
                        width={30} // Adjust the width as needed
                        height={15} // Adjust the height as needed
                        className="cursor-pointer"
                        onClick={() => signIn('google', { callbackUrl })}
                    />
                </div>
            </div>
        </div>

    )
}

export default SignUp