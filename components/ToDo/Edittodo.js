'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const getTodo = async (todoId) => {
    try {
        const res = await fetch(`/api/onetodo/${todoId}`, {
            method: "GET",
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

const Edittodo = ({ todoId }) => {
    const { data: session } = useSession()
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const [formData, setFormData] = useState({

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const fetchData = async () => {
        if (session?.user?._id) {
            setLoading(true); // set loading to true before fetching data
            const fetchedTodo = await getTodo(todoId);
            console.log(fetchedTodo)
            if (fetchedTodo) {
                setFormData({
                    title: fetchedTodo.todo.title || '',
                    description: fetchedTodo.todo.description || '',
                    endDate: fetchedTodo.todo.endDate || '',
                    status: fetchedTodo.todo.status || 'On Going'
                });
            }

            setLoading(false); // set loading to false after fetching data
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/onetodo/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newTitle: formData.title,
                    newDescription: formData.description,
                    newEndDate: formData.endDate,
                    newStatus: formData.status,
                })

            });
            if (res.ok) {
                toast("ok")
                router.push('/')
            } else {
                throw new Error('Failed to create food');
            }
        } catch (error) {
            // Handle error, show an error message, etc.
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit} className="w-96 bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                    <input type="text" name="title" id="title" onChange={handleChange} value={formData.title} required className="mt-1 p-2 w-full border rounded-md" />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                    <textarea name="description" id="description" onChange={handleChange} value={formData.description} required className="mt-1 p-2 w-full border rounded-md"></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">End Date</label>
                    <input type="datetime-local" name="endDate" id="endDate" onChange={handleChange} value={formData.endDate} required className="mt-1 p-2 w-full border rounded-md" />
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-600">Status</label>
                    <select name="status" id="status" onChange={handleChange} value={formData.status} className="mt-1 p-2 w-full border rounded-md">
                        <option value="On Going">On Going</option>
                        <option value="To be done">To be done</option>
                        <option value="done">done</option>
                    </select>
                </div>

                <div className="mt-6">
                    <button type="submit" className="w-full p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">Edit Todo</button>
                </div>
            </form>
        </div>
    );
}
export default Edittodo