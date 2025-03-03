import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { MdOutlineDelete } from "react-icons/md";

const Todo = () => {

    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todo')) || []);

    const handleTodo = () => {
        if (todo.trim() !== '' || todo.trim().length > 3) {
            setTodos([...todos, todo]);
            localStorage.setItem('todo', JSON.stringify(todos));
            setTodo('');
        }
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    }

    const handleUpdate = (index) => {
        const updatedTodo = prompt('Update Todo', todos[index]);
        if (updatedTodo.trim() === '' || updatedTodo === null) {
            return;
        }
        const newTodos = [...todos];
        newTodos[index] = updatedTodo;
        setTodos(newTodos);
    };

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todos));
    }, [todos])

    return (
        <div className='w-[350px] h-[400px] p-3 rounded-md bg-white shadow-md'>
            <h1 className='text-2xl font-bold'>Todo App</h1>

            <div className='flex items-center gap-1 my-3'>
                <input value={todo} onChange={(e) => setTodo(e.target.value)} type="text" placeholder='Enter Todo' className='flex-1 border border-black p-2 font-semibold text-md focus:outline-none' />
                <button onClick={handleTodo} className='bg-violet-700 text-white p-[13px] rounded-sm hover:bg-violet-600'><FaPlus /></button>
            </div>

            <hr />

            <div className='overflow-y-scroll w-full h-[280px]'>
                <div className='flex flex-col gap-2 my-3'>
                    {
                        todos.length > 0 ? (
                            todos.map((item, index) => {
                                return <div key={index} className='flex items-center p-2 bg-violet-200 cursor-pointer hover:bg-violet-300'>
                                    <p className='flex-1 font-semibold text-lg'>{item}</p>
                                    <button onClick={() => handleUpdate(index)} className='bg-green-600 text-white p-2 mx-1 rounded-sm text-2xl'><TiEdit /></button>
                                    <button onClick={() => deleteTodo(index)} className='bg-red-600 text-white p-2 rounded-sm text-2xl'><MdOutlineDelete /></button>
                                </div>
                            })
                        ) : <p className='text-center font-semibold'>No todo yet !!</p>
                    }

                </div>
            </div>

        </div>
    )
}

export default Todo