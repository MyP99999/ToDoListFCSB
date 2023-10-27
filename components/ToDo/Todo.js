'use client'
import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import Header from './Header';
import { useRouter } from 'next/navigation';
import { data } from 'autoprefixer';
import { useSession } from 'next-auth/react';

const getTodo = async (userId, page, limit = 9) => {
    try {
        const url = `/api/todo/${userId}?page=${page}&limit=${limit}`;
        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch todo");
        }

        return res.json();
    } catch (error) {
        console.error("Error loading todo: ", error);
    }
};


const Todo = () => {
    const router = useRouter();
    const { data: session } = useSession()

    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(false); // added loading state
    const [newest, setNewest] = useState(true)
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const filteredTodos = todo.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())); // Filter the todos based on search query

    const fetchData = async () => {
        if (session?.user?._id) {
            setLoading(true); // set loading to true before fetching data
            const limit = 9; // You can set this as a constant or make it dynamic
            const fetchedData = await getTodo(session.user._id, page, limit);
            if (fetchedData?.todo) {
                const sortedTodos = newest
                    ? [...fetchedData?.todo].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    : [...fetchedData?.todo].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                setTodo(sortedTodos);
            }
            setTotalPages(fetchedData.totalPages || 0);
            setLoading(false); // set loading to false after fetching data
        }
    };

    useEffect(() => {
        fetchData();
    }, [session, newest, page]);

    const handleCreated = () => {
        setNewest(prevNewest => !prevNewest);
    }

    const changePage = (newPage) => {
        setPage(newPage);
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
                <div className="pagination-controls flex justify-center items-center mt-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            disabled={page === i + 1}
                            className={`mx-1 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline ${page === i + 1 ? "bg-blue-300" : ""
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Todo;
