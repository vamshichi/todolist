import axios from 'axios';

export const Todos = ({ todos, setTodos }) => {

  const handleComplete = async (id) => {
    try {
      await axios.put('http://localhost:5000/completed', { id });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: true } : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:5000/delete', { data: { id } });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      {todos.map((todo, index) => (
        <div key={index} className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold">{todo.title}</h3>
          <p className="mb-4">{todo.description}</p>
          <button
            onClick={() => handleComplete(todo._id)}
            className={`px-4 py-2 rounded-md mr-2 ${todo.completed ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {todo.completed ? 'Completed' : 'Mark as Complete'}
          </button>
          <button
            onClick={() => handleDelete(todo._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
