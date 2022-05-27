import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import {useState} from 'react'
import AddTask from './components/AddTask';

function App() {

  const [showAdd,setShowAdd] = useState(false);
  const [tasks,setTasks]=useState([{id:1,text:'doctor', day:'May 27', reminder:true}])

  const addTask = (task)=>{
    const id = tasks.length+1;
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id)=>{
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  const toggleReminder=(id)=>{
    setTasks(tasks.map((task)=> task.id===id?{...task,reminder:!task.reminder}:task))
  }

  return (
    <div className="App">
      <Header onAddTask={()=>setShowAdd(!showAdd)} showAdd={showAdd}/>
      {showAdd && <AddTask onAdd={addTask}/>}
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
    </div>
  );
}

export default App;
