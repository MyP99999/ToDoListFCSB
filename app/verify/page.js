import { verifyWithCredentials } from '@/actions/authActions'
import React from 'react'

const VerifyPage = async ({ searchParams: { token } }) => {
    const res = await verifyWithCredentials(token)

    return (
        <div className='h-screen flex items-center'>

            <h1>{res?.msg}</h1>
        </div>
    )
}

export default VerifyPage