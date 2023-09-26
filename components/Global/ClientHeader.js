'use client'
import React, { useCallback } from 'react';
import Link from 'next/link';
import SignOut from '../Auth/SignOut';
import Menu from './Menu';
import { useRouter } from 'next/navigation';

const ClientHeader = ({ session }) => {
    const router = useRouter(); // initialize useRouter

    const handleHomeClick = useCallback(() => {
        const headerHeight = document.querySelector('header').offsetHeight; // Adjust the selector if necessary
        window.scrollTo({ top: -headerHeight, behavior: 'smooth' });
    }, []);

    const renderHomeButton = () => {
        if (router.pathname === '/') {
            // If on the home page, use a div with onClick to scroll to top
            return (
                <a
                    onClick={(e) => {
                        e.preventDefault(); // Prevent the default link click action
                        handleHomeClick();
                    }}
                    className="cursor-pointer text-3xl font-poppins font-medium text-white hover:scale-105 duration-200"
                >
                    MyProSiteBuilder
                </a>
            );
        } else {
            // Otherwise, use a Link component to navigate to the home page
            return (
                <Link href="/" className="cursor-pointer text-3xl font-poppins font-medium text-white hover:scale-105 duration-200">
                    MyProSiteBuilder
                </Link>
            );
        }
    };

    return (
        <div className="flex justify-between items-center max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            {renderHomeButton()}

            {/* Burger menu for smaller screens */}
            <div className="md:hidden">
                <Menu />
            </div>

            <nav className="hidden md:flex space-x-4">
                <Link href="#technologies" className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-200'>
                    Technologies
                </Link>
                {session ? (
                    <>
                        <Link href="/profile/client">Profile (Client)</Link>
                        <Link href="/profile/server">Profile (Server)</Link>
                        <Link href="/dashboard">Admin Dashboard</Link>
                        <SignOut />
                    </>
                ) : (
                    <Link href="/signin" className='px-4 cursor-pointer capitalize font-medium text-white hover:scale-105 duration-200'>SignIn</Link>
                )}
            </nav>
        </div>
    );
};

export default ClientHeader;
