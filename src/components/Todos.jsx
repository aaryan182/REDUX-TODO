import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';

function Todos() {
    const todos = useSelector(state => state.todo.todos);
    const dispatch = useDispatch();

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    return (
        <>
            <div className="text-3xl font-bold mb-4 text-gray-50 p-4">Todos</div>
            <ul className="list-none">
                {todos.map((todo) => (
                    <li key={todo.id} className="flex justify-between items-center bg-zinc-800 px-4 py-2 rounded text-white mt-4">
                        {editId === todo.id ? (
                            <input
                                type="text"
                                className="text-black"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onBlur={() => {
                                    dispatch(updateTodo({ id: todo.id, text: editText }));
                                    setEditId(null);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        dispatch(updateTodo({ id: todo.id, text: editText }));
                                        setEditId(null);
                                    } else if (e.key === 'Escape') {
                                        setEditId(null);
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <div
                                role="button"
                                tabIndex={0}
                                onDoubleClick={() => {
                                    setEditId(todo.id);
                                    setEditText(todo.text);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setEditId(todo.id);
                                        setEditText(todo.text);
                                    }
                                }}
                                style={{ cursor: 'pointer' }}
                                aria-label="Edit todo"
                            >
                                {todo.text}
                                <br />
                                <small className="text-gray-400">
                                    {new Date(todo.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                                </small>
                            </div>
                        )}
                        <button
                            onClick={() => dispatch(removeTodo(todo.id))}
                            className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                            aria-label="Delete todo"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Todos;
