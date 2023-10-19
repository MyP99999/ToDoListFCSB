import Image from 'next/image'
import { Inter } from 'next/font/google'
import Home from '@/components/Global/Home'
import SocialLinks from '@/components/Global/SocialLinks'
import Technologies from '@/components/Global/Technologies'
import Todo from '@/components/ToDo/Todo'
import Header from '@/components/ToDo/Header'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {

  return (
    <main>
        <Todo />
    </main>
  )
}
