import React from 'react';

const TodoItem = ({ todo }) => {
    return (
        <tr className="text-center">
            <td className="py-2 px-4 border-b">{todo.title}</td>
            <td className="py-2 px-4 border-b">{new Date(todo.createdAt).toLocaleString()}</td>
            <td className="py-2 px-4 border-b">{todo.status}</td>
            <td className="py-2 px-4 border-b">
                <div className="flex items-center justify-center space-x-2">
                    <button className="bg-yellow-500 p-2 rounded-full">Vezi</button>
                    <button className="bg-yellow-500 p-2 rounded-full">E</button>
                    <button className="bg-green-400 p-2 rounded-full">/</button>
                    <button className="bg-red-500 p-2 rounded-full">X</button>
                </div>
            </td>
        </tr>
    );
}

export default TodoItem;
