'use client'
import { signIn } from "next-auth/react"
import Link from "next/link"
import Form from "../Global/Form"
import Button from "../Global/Button"
import { forgotPasswordWithCredentials } from "@/actions/authActions"

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
    <div className="border-2 p-4 border-black">
      <h2>Sing In With NextAuth</h2>

      {/* GoogleLogin */}
      <div className='mt-4 bg-gray-200 border-2 border-black'>
        <button onClick={() => signIn('google', { callbackUrl })}>
          Continue with Google
        </button>
      </div>

      {/* SignIn with credentials */}
      <Form action={handleCredentialsLogin} className='my-12'>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <Button value='Credentials Login' />
      </Form>

      {/* Forgot Password */}
      <h3>Forgot Password?</h3>

      <Form action={handleForgotPassword} className='my-12'>
        <input type="email" name="email" placeholder="Email" required />
        <Button value='Forgot Password' />
      </Form>


      <div className="my-12 bg-gray-200 border-2 border-black">
        <Link href='/signup'>Sign Up</Link>
      </div>
    </div>
  )
}

export default SignIn