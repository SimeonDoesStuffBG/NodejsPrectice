import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import MOCK_TODOS from './model/mock-todos';
import { ALL_STAT } from './model/todo-model';

function App() {
  return (
    <div className="App-header">
      <h1>To-do Demo</h1>
      <TodoList todos={MOCK_TODOS} filter={ALL_STAT}/>
    </div>
  );
}

export default App;
