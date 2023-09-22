import { verifyWithCredentials } from '@/actions/authActions'
import React from 'react'

const VerifyPage = async ({ searchParams: { token } }) => {
    const res = await verifyWithCredentials(token)

    return (
        <h1>{res?.msg}</h1>
    )
}

export default VerifyPage