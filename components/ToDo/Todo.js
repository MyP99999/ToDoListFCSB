'use client'
import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import Header from './Header';
import { useRouter } from 'next/navigation';
import { data } from 'autoprefixer';
import { useSession } from 'next-auth/react';

const Todo = () => {
    const router = useRouter();
    const { data: session } = useSession()
    console.log(session)

    useEffect(() => {
        if(!session){
            router.push('/registration');
        }
    }, [router]);

    return (
        <div className="flex flex-grow justify-center bg-gray-300 w-full min-h-screen">
            <div className="w-full lg:max-w-6xl overflow-x-auto mt-36">
                <Header />
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-4 border-b">Titlu</th>
                            <th className="py-2 px-4 border-b">Creata La</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <TodoItem />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Todo;
