import { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/todo')
      .then(function (res) {
        setTodos(res.data.todos);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <CreateTodo setTodos={setTodos} />
      <Todos todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
