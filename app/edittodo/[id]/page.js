import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Edittodo from '@/components/ToDo/Edittodo'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const EditPage = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession(authOptions)
  if (!session) redirect("/registration")

  return (
    <div>
      <Edittodo todoId={id} />
    </div>
  )
}

export default EditPage