'use client'
import React, { useCallback } from 'react';
import Link from 'next/link';
import SignOut from '../Auth/SignOut';
import Menu from './Menu';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import { motion } from 'framer-motion';

const ClientHeader = ({ session }) => {
    const router = useRouter(); 
    const pathname = usePathname()
  
    const handleHomeClick = useCallback(() => {
        const headerHeight = document.querySelector('header').offsetHeight; 
        window.scrollTo({ top: -headerHeight, behavior: 'smooth' });
    }, []);

    const renderHomeButton = () => {
        if (pathname === '/') {
            // If on the home page, use a div with onClick to scroll to top
            return (
                <motion.a
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.15 }}  
                    transition={{ duration: 0.5 }}
                    onClick={(e) => {
                        e.preventDefault();
                        handleHomeClick();
                    }}
                    className="flex items-center cursor-pointer text-yellow-400 text-3xl font-poppins font-medium overflow-hidden"
                >
                    <Image className='mb-1' src="/fcsb.png" alt="FCSB Logo" width={50} height={50} />
                    FC FCSB SA
                </motion.a>
            );
        } else {
            // Otherwise, use a Link component to navigate to the home page
            return (
                <Link href="/" className="flex items-center cursor-pointer text-yellow-400 text-3xl font-poppins font-medium hover:scale-105 duration-200">
                    <Image className='mb-1' src="/fcsb.png" alt="FCSB Logo" width={50} height={50} />
                    FC FCSB SA
                </Link>
            );
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };


    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex justify-between items-center max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
        >
            {renderHomeButton()}

            {/* Burger menu for smaller screens */}
            <div className="md:hidden">
                <Menu />
            </div>

            <nav className="hidden md:flex space-x-4">
                {pathname === '/about' && (
                    <Link href="#technologies" className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-200'>
                        Technologies
                    </Link>
                )}
                {/* <Link href="/about" className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-200'>
                    About
                </Link> */}
                {session ? (
                    <>
                        <SignOut />
                    </>
                ) : (
                    <Link href="/registration" className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-200'>SignIn</Link>
                )}
            </nav>
        </motion.div>
    );
};

export default ClientHeader;
