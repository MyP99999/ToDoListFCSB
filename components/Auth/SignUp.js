'use client'
import { signUpWithCredentials } from "@/actions/authActions"
import Button from "../Global/Button"
import Form from "../Global/Form"
import Link from "next/link"


const SignUp = () => {

    async function handleSignUpCredentials(formData) {
        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')

        const res = await signUpWithCredentials({ name, email, password })
        if (res?.msg) alert(res?.msg)
    }

    return (
        <div>
            <h2>Sign Up With NextAuth</h2>
            <Form action={handleSignUpCredentials} className='my-12' >
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <Button value='Register' />
            </Form>

            <div className="my-12 bg-gray-200 border-2 border-black">
                <Link href='/signin'>Sign In</Link>
            </div>
        </div>
    )
}

export default SignUp