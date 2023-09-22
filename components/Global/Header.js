'use server'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignOut from '../Auth/SignOut'


const Header = async () => {
    const session = await getServerSession(authOptions)

    return (
        <header className='m-4 flex gap-4'>
            <Link className='' href='/'>Home</Link>
            <Link href='/protected/client'>Protected Client</Link>
            <Link href='/protected/server'>Protected Server</Link>

            {
                session
                    ? <>
                        <Link href='/profile/client'>Profile (Client)</Link>
                        <Link href='/profile/server'>Profile (Server)</Link>
                        <Link href='/dashboard'>Admin Dashboard</Link>

                        <SignOut />

                    </>
                    : <Link href='/signin'>SignIn</Link>
        }
        </header>
    )
}

export default Header