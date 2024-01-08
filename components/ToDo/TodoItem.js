'use client'
import useCountdown from '@/hooks/useCountdown';
import React, { useState } from 'react';
import TodoModal from './TodoModal';
import Link from 'next/link';
import { motion } from 'framer-motion'
import Image from 'next/image';


const TodoItem = ({ todo, fetchData }) => {
    const countdown = useCountdown(todo.endDate);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");

        try {
            if (confirmed) {
                const res = await fetch(`/api/todo?id=${todo?._id}`, {
                    method: "DELETE",
                });
                if (res?.ok) {
                    fetchData()
                } else {
                    throw new Error('Failed to remove todo');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleMarkAsDone = async () => {
        const confirmed = window.confirm("Are you sure you want to mark this item as done?");

        if (!confirmed) return;

        try {
            const res = await fetch(`/api/todo/${todo?._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: "done" }) // Assuming your server expects the new status in the request body
            });

            if (res?.ok) {
                fetchData(); // Refetch the todos
            } else {
                throw new Error('Failed to update todo status.');
            }
        } catch (error) {
            console.log(error);
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

    return (
        <>
            <td className="py-2 px-4 border-b text-center">{todo.title}</td>
            <td className="py-2 px-4 border-b text-center">{new Date(todo.createdAt).toLocaleString()}</td>
            <td className='py-2 px-4 border-b text-center hidden md:table-cell overflow-hidden'>
                <h4 className={`w-2/3 mx-auto ${countdown.isOverdue ? 'bg-red-500' : 'bg-green-500'} rounded-full text-white`}>
                    {countdown.isOverdue ? "Overdue" : `${countdown.timeLeft.days}d ${countdown.timeLeft.hours}h ${countdown.timeLeft.minutes}m`}
                </h4>
            </td>

            <td className="py-2 px-4 border-b text-center">{todo.status}</td>
            <td className="py-2 px-4 border-b text-center">
                <div className="flex items-center justify-center space-x-2">
                    <motion.button
                        variants={buttonVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => setIsModalOpen(true)}
                        className="bg-yellow-500 p-2 rounded-full">
                        Vezi
                    </motion.button>
                    <motion.button
                        variants={buttonVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link href={`/edittodo/${todo?._id}`}>
                            <Image src="/edit-button.png" alt="bin" width={35} height={35} />
                        </Link>
                    </motion.button>
                    <motion.button
                        variants={buttonVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleMarkAsDone}
                    >
                        <Image src="/check-button.png" alt="bin" width={35} height={35} />
                    </motion.button>
                    <motion.button
                        variants={buttonVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleDelete}
                    >
                        <Image src="/bin.png" alt="bin" width={35} height={35} />
                    </motion.button>
                </div>
            </td>
            {isModalOpen && <TodoModal todo={todo} countdown={countdown} onClose={() => setIsModalOpen(false)} />}

        </>
    );
}

export default TodoItem;
