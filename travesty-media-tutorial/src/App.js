import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import {useState} from 'react'

function App() {

  const [tasks,setTasks]=useState([{id:1,text:'doctor', day:'May 27', reminder:true}])

  const deleteTask = (id)=>{
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  const toggleReminder=(id)=>{
    setTasks(tasks.map((task)=> task.id===id?{...task,reminder:!task.reminder}:task))
  }

  return (
    <div className="App">
      <Header title = "Add"/>
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
    </div>
  );
}

export default App;
