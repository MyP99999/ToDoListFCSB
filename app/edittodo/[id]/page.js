import Edittodo from '@/components/ToDo/Edittodo'
import React from 'react'

const EditPage = ({ params }) => {
  const { id } = params;
  console.log("sad")
  console.log(id)

  return (
    <div>
      <Edittodo todoId={id} />
    </div>
  )
}

export default EditPage