'use server'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ClientHeader from './ClientHeader'; // Adjust the path accordingly

const Header = async () => {
    const session = await getServerSession(authOptions);

    return (
        <header className="fixed z-50 w-full h-16 flex justify-center items-center bg-[#050214] border-b-2 text-white">
            <ClientHeader session={session} />
        </header>
    );
};

export default Header;