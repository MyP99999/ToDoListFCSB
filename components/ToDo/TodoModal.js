const TodoModal = ({ todo, countdown, onClose }) => (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60">
        <div className="bg-white rounded p-12">
            <h2 className="text-xl font-bold mb-4">{todo.title}</h2>
            <h2 className="text-xl font-bold mb-4">{todo.description}</h2>
            <p><strong>Remaining:</strong> {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s </p>
            <p><strong>Created At:</strong> {new Date(todo.createdAt).toLocaleString()}</p>
            <p><strong>End Date:</strong> {new Date(todo.endDate).toLocaleString()}</p>
            <p><strong>Status:</strong> {todo.status}</p>
            {/* ... any other todo details ... */}
            <button className="mt-4 p-2 bg-red-500 text-white rounded" onClick={onClose}>Close</button>
        </div>
    </div>
);

export default TodoModal;
