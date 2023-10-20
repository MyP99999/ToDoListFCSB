'use client'
import useCountdown from '@/hooks/useCountdown';
import React, { useState } from 'react';
import TodoModal from './TodoModal';
import Link from 'next/link';

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


    return (
        <tr className="text-center">
            <td className="py-2 px-4 border-b">{todo.title}</td>
            <td className="py-2 px-4 border-b">{new Date(todo.createdAt).toLocaleString()}</td>
            <td className="py-2 px-4 border-b">{countdown.days}d {countdown.hours}h {countdown.minutes}m {/* {countdown.seconds}s */}</td>
            <td className="py-2 px-4 border-b">{todo.status}</td>
            <td className="py-2 px-4 border-b">
                <div className="flex items-center justify-center space-x-2">
                    <button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 p-2 rounded-full">Vezi</button>
                    <button className="bg-yellow-500 p-2 rounded-full">
                        <Link href={`/edittodo/${todo?._id}`}>E</Link>
                    </button>
                    <button onClick={handleMarkAsDone} className="bg-green-400 p-2 rounded-full">/</button>
                    <button onClick={handleDelete} className="bg-red-500 p-2 rounded-full">X</button>
                </div>
            </td>
            {isModalOpen && <TodoModal todo={todo} countdown={countdown} onClose={() => setIsModalOpen(false)} />}

        </tr>
    );
}

export default TodoItem;
