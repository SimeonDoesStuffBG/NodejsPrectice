import './App.css';
import TodoList from './components/TodoList';
import MOCK_TODOS from './model/mock-todos';
import { ALL_STAT } from './model/todo-model';
import TodoInput from './components/TodoInput';
import {useState} from 'react';

function App() {
  const [todos,setTodos] = useState(MOCK_TODOS);
  function handleCreateTodo(todo){ 
    setTodos([...todos,todo]);
  }
  return (
    <div className="App-header">
      <h1>To-do Demo</h1>
      <TodoInput onCreateTodo={handleCreateTodo}/>
      <TodoList todos={todos} filter={ALL_STAT}/>
    </div>
  );
}

export default App;
