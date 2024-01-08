'use client'

import React from 'react'
import Form from '../Global/Form'
import Button from '../Global/Button'
import { resetPasswordWithCredentials } from '@/actions/authActions'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

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

    const sliderVariants = {
        initial: {
            x: 0,
        },
        animate: {
            x: "-220%",
            transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 15,
            }
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen relative overflow-hidden'>
            <div className='w-full max-w-md p-8 m-4 rounded-lg shadow-lg bg-gray-200'>
                <h1 className='text-3xl font-semibold text-center text-gray-800 mb-6'>Reset Password</h1>

                <Form action={handleResetPassword} className='flex flex-col gap-4'>
                    <div className="mb-4">
                        <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>New Password</label>
                        <input type="password" name="password" id="password" placeholder='Enter new password' required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                    </div>

                    <Button type="submit" value='Reset' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out'>
                    </Button>
                </Form>
            </div>
            <motion.div className="absolute text-[50vh] bottom-[-120px] whitespace-nowrap text-[#f7e0356c] w-1/2 font-bold pointer-events-none" variants={sliderVariants} initial="initial" animate="animate">
                FC FCSB SA
            </motion.div>
        </div>
    )
}

export default ResetPasswordComponent