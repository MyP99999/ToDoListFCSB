import Image from 'next/image'
import { Inter } from 'next/font/google'
import Home from '@/components/Global/Home'
import SocialLinks from '@/components/Global/SocialLinks'
import Technologies from '@/components/Global/Technologies'
import Todo from '@/components/ToDo/Todo'
import Header from '@/components/ToDo/Header'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })


export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/registration")

    return (
      <main>
        <Todo />
      </main>
    )
}
