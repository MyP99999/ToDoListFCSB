'use client'
import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import Header from './Header';
import { useRouter } from 'next/navigation';
import { data } from 'autoprefixer';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion'
import { PulseLoader } from 'react-spinners'
import Link from 'next/link';

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
    const [loading, setLoading] = useState(true); // added loading state
    const [newest, setNewest] = useState(true)
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [counter, setCounter] = useState(0)

    const filteredTodos = todo.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())); // Filter the todos based on search query

    const fetchData = async () => {
        if (session?.user?._id) {
            setCounter((counter) => counter + 1)
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2 // This will stagger the animation of children
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -150 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring', stiffness: 100
            }
        }
    };

    const buttonVariants = {
        initial: {
            scale: 0,
            opacity: 0
        },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1
            }
        },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.3,
                yoyo: Infinity
            },
        },
        tap: {
            scale: 0.95,
        },
    };

    const sliderVariants = {
        initial: {
            x: 0,
        },
        animate: {
            x: "-220%",
            transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 15,
            }
        }
    }


    return (
        <div class="flex flex-grow justify-center overflow-hidden bg-gray-300 w-full min-h-screen relative">
            <div class="w-full lg:max-w-6xl overflow-auto mt-36 z-10">
                <div className='flex flex-col items-center gap-2 text-center p-2 bg-gray-50'>
                    <Link href="/addtodo" passHref>
                        <motion.button
                            className="ml-4 py-2 px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                            variants={buttonVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Add Todo
                        </motion.button>
                    </Link>
                    <Header onSearchChange={setSearchQuery} /> {/* Pass the setSearchQuery to Header */}
                </div>
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr className='border-b'>
                            <th className="py-2 px-4">Titlu</th>
                            <th className="py-2 px-4 cursor-pointer" onClick={handleCreated}>
                                Creata La <span>{!newest ? '↓' : '↑'}</span>
                            </th>
                            <th className="py-2 px-4 hidden md:block">Countdown</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4"></th>
                        </tr>
                    </thead>
                    <motion.tbody
                        initial="hidden"
                        animate={!loading ? "visible" : "hidden"}
                        variants={containerVariants}
                    >
                        {loading && counter > 1 ? (
                            <td colSpan="5" className="text-center py-4">
                                <div>
                                    <PulseLoader color="#d63636" />
                                </div>
                            </td>
                        ) : filteredTodos.length === 0 ? (
                            <td colSpan="5" className="text-center py-4">
                                <div className="text-gray-600">
                                    Nu ai nimic de facut!
                                </div>
                            </td>
                        ) : (
                            filteredTodos.map((item, index) => (
                                <motion.tr key={index} variants={itemVariants} className="text-center">
                                    <TodoItem fetchData={fetchData} todo={item} />
                                </motion.tr>
                            ))
                        )}
                    </motion.tbody>

                </table>
                {loading && counter < 2 && <PulseLoader className="text-center mx-auto pt-10" color="#d63636" />}
                <div className="pagination-controls flex justify-center items-center mt-4">
                    {Array.from({ length: totalPages }, (_, i) => {
                        const currentPage = i + 1;
                        const isCurrentPage = page === currentPage;
                        return (
                            <motion.button
                                variants={buttonVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                                whileTap="tap"
                                key={currentPage}
                                onClick={() => setPage(currentPage)}
                                disabled={isCurrentPage}
                                className={`mx-1 px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:shadow-outline ${isCurrentPage
                                    ? "bg-red-500 hover:bg-red-700" // Highlight current page with different color
                                    : "bg-blue-500 hover:bg-blue-700"
                                    }`}
                            >
                                {currentPage}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
            <motion.div className="absolute text-[50vh] bottom-[-120px] whitespace-nowrap text-[#f7e0356c] w-1/2 font-bold pointer-events-none" variants={sliderVariants} initial="initial" animate="animate">
                FC FCSB SA
            </motion.div>
        </div >
    );
}

export default Todo;
