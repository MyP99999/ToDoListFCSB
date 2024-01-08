import { verifyWithCredentials } from '@/actions/authActions'
import React from 'react'
import Verify from '@/components/Auth/Verify'

const VerifyPage = async ({ searchParams: { token } }) => {
    const res = await verifyWithCredentials(token)


    return (
        <>
            <Verify res={res} />
        </>
    )
}

export default VerifyPage