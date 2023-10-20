'use client'
import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import Header from './Header';
import { useRouter } from 'next/navigation';
import { data } from 'autoprefixer';
import { useSession } from 'next-auth/react';

const getTodo = async (userId) => {
    try {
        const res = await fetch(`/api/todo/${userId}`, {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch todo");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading todo: ", error);
    }
}

const Todo = () => {
    const router = useRouter();
    const { data: session } = useSession()

    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(false); // added loading state
    const [newest, setNewest] = useState(true)
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query

    const filteredTodos = todo.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())); // Filter the todos based on search query

    const fetchData = async () => {
        if (session?.user?._id) {
            setLoading(true); // set loading to true before fetching data
            const fetchedTodo = await getTodo(session.user._id);
            if (fetchedTodo?.todo) {
                const sortedTodos = newest
                    ? [...fetchedTodo?.todo].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    : [...fetchedTodo?.todo].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setTodo(sortedTodos);
            }
            setLoading(false); // set loading to false after fetching data
        }
    };

    useEffect(() => {
        fetchData();
    }, [session, newest]);

    const handleCreated = () => {
        setNewest(prevNewest => !prevNewest);
    }

    return (
        <div className="flex flex-grow justify-center bg-gray-300 w-full min-h-screen">
            <div className="w-full lg:max-w-6xl overflow-x-auto mt-36">
                <Header onSearchChange={setSearchQuery} /> {/* Pass the setSearchQuery to Header */}
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-4 border-b">Titlu</th>
                            <th className="py-2 px-4 border-b cursor-pointer" onClick={handleCreated}>
                                Creata La <span>{!newest ? '↓' : '↑'}</span>
                            </th>
                            <th className="py-2 px-4 border-b">Countdown</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">Loading...</td>
                            </tr>
                        ) : (
                            filteredTodos?.map((item) => (
                                <TodoItem fetchData={fetchData} key={item._id} todo={item} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Todo;
