'use server'
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignOut from '../Auth/SignOut';
import Menu from './Menu';

const Header = async () => {
    const session = await getServerSession(authOptions);

    return (
        <header className="h-16 flex justify-center items-center bg-[#050214] border-b-2 text-white">
            <div className="flex justify-between items-center max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <Link href="/" className="text-3xl font-poppins">
                    MyProSiteBuilder
                </Link>

                {/* Burger menu for smaller screens */}
                <div className="md:hidden">
                    <Menu />
                </div>

                {/* Navigation menu for larger screens */}
                <nav className="hidden md:flex space-x-4">
                    <Link href="/protected/client">Protected Client</Link>
                    <Link href="/protected/server">Protected Server</Link>

                    {session ? (
                        <>
                            <Link href="/profile/client">Profile (Client)</Link>
                            <Link href="/profile/server">Profile (Server)</Link>
                            <Link href="/dashboard">Admin Dashboard</Link>
                            <SignOut />
                        </>
                    ) : (
                        <Link href="/signin">SignIn</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
