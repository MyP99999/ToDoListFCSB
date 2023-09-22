import SignIn from '@/components/Auth/SignIn'
import React from 'react'

const SignInPage = ({ searchParams: { callbackUrl } }) => {
  return (
    <SignIn callbackUrl={callbackUrl || '/'} />
    )
}

export default SignInPage