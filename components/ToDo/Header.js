import Link from 'next/link';
import React from 'react'

const Header = () => {
    return (
        <div className='flex flex-col items-center gap-2 text-center p-2 bg-gray-50'>
            <Link
                className="ml-4 py-2 px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                href="/addtodo"
            >
                Add Todo
            </Link>
            <input
                type="text"
                className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-1/2"
                placeholder="Search todo..."
            />
        </div>
    )
}

export default Header;
