import Addtodo from '@/components/ToDo/Addtodo'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const  AddtodoPage = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)
  if (!session) redirect("/registration")
  return (
    <Addtodo />
  )
}

export default AddtodoPage