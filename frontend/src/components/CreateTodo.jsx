import { useState } from 'react';
import axios from 'axios';

export const CreateTodo = ({ setTodos }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTodo = async () => {
    try {
      await axios.post('http://localhost:5000/todo', {
        title,
        description
      });
      const res = await axios.get('http://localhost:5000/todo');
      setTodos(res.data.todos);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={addTodo}
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Todo
      </button>
    </div>
  );
};
