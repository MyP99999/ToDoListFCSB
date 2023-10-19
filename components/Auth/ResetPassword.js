'use client'

import React from 'react'
import Form from '../Global/Form'
import Button from '../Global/Button'
import { resetPasswordWithCredentials } from '@/actions/authActions'
import { useRouter } from 'next/navigation'

const ResetPasswordComponent = ({ token }) => {
    const router = useRouter()
    async function handleResetPassword(formData) {
        const password = formData.get('password')

        if (!password) {
            alert('Password is missing');
            return;
        }

        try {
            const res = await resetPasswordWithCredentials({ token, password });

            if (res?.msg) {
                alert(res.msg);
            }


            router.push("/registration");

        } catch (error) {
            console.error('Error resetting password:', error);
            alert('Error resetting password. Please try again.');
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1>Reset Password</h1>

            <Form action={handleResetPassword}>
                <input type="password" name="password" placeholder='Password' required />

                <Button value="Reset Password" />
            </Form>
        </div>
    )
}

export default ResetPasswordComponent