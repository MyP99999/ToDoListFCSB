import React from 'react'
import Registration from '../../components/Auth/Registration'

const RegistrationPage = ({ searchParams: { callbackUrl } }) => {
  return (
    <div>
        <Registration callbackUrl={callbackUrl} />
    </div>
  )
}

export default RegistrationPage