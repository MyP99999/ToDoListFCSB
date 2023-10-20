'use client'
import { signOut } from "next-auth/react"

const SignOut = () => {
  return (
    <button className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-200' onClick={() => signOut()}>SignOut</button>
    )
}

export default SignOut