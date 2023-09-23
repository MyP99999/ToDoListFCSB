'use client'
import { signIn } from "next-auth/react"
import Link from "next/link"
import Form from "../Global/Form"
import Button from "../Global/Button"
import { forgotPasswordWithCredentials } from "@/actions/authActions"
import Image from "next/image"

const SignIn = ({ callbackUrl }) => {

  async function handleCredentialsLogin(formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    await signIn('credentials', { email, password, callbackUrl })
  }

  async function handleForgotPassword(formData) {
    const email = formData.get('email')
    const res = await forgotPasswordWithCredentials({ email })

    if (res?.msg) alert(res?.msg)
  }



  return (
    <div className="body-bg-image flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>

      <div className="rainbow p-6 font-poppins min-w-[400px] min-h-[700px] text-[#FFFFFF] rounded-md">
        <div className="z-3">

          <h2 className="text-2xl font-semibold text-center">Sing In</h2>

          <div className="flex flex-col justify-center items-center text-[16px] gap-2 mt-4 font-semibold">
            <h5>If you don't have an account</h5>
            <h5>You can <Link href='/signup' className="text-[#C10C99] font-bold hover:text-[#9C0C84] focus:outline-none">Register here!</Link></h5>
          </div>

          {/* SignIn with credentials */}
          <Form action={handleCredentialsLogin} className='my-12 flex flex-col gap-4'>
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

            <Button value='Credentials Login' className="bg-[#C10C99] rounded-xl p-2 mt-6 hover:bg-[#9C0C84] focus:outline-none" />
          </Form>



          <Form action={handleForgotPassword} className="max-w-md mx-auto">
            <label htmlFor="email" className="text-xs font-semibold">Email</label>
            <div className="flex items-center mt-2">
              <input
                className="flex-grow bg-[#050214] text-white rounded-md py-2 px-1 font-poppins border border-white focus:outline-none"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <Button
                value="Forgot Password"
                className="bg-[#C10C99] text-white text-sm py-2 px-4 ml-2 rounded-md hover:bg-[#9C0C84] focus:outline-none"
              />
            </div>
          </Form>

          <div className="flex flex-col items-center justify-center gap-2">
            <h5 className="text-[16px] font-thin mt-12">or continue with</h5>
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

    </div>
  )
}


export default SignIn

