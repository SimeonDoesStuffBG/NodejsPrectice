import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import React, {useState,useEffect} from 'react'
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import About from './components/About';

function App() {

  const [showAdd,setShowAdd] = useState(false);

  const [tasks,setTasks]=useState([]);

  useEffect(() => {
    const getTasks = async() =>{
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, [])
  
  const fetchTasks = async()=>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();

    return data;
  }

  const fetchTask = async(id)=>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json();

    return data;
  }


  const addTask = async (task)=>{
    /*const id = tasks.length+1;
    const newTask = {id, ...task};*/
    const res = await fetch('http://localhost:5000/tasks',{ 
      method:'POST',
      headers:{ 
        'Content-type':'application/json'
      },
      body:JSON.stringify(task)
    });

    const newTask =await res.json();
    setTasks([...tasks, newTask]);
  }

  const deleteTask = async (id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE',
    });

    setTasks(tasks.filter((task)=>task.id!==id))
  }

  const toggleReminder= async (id)=>{
    const taskToUpdate = await fetchTask(id);
    const uppTask = {...taskToUpdate, reminder:!taskToUpdate.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(uppTask)
    })
    console.log(res);

    const data = await res.json();

    setTasks(
      tasks.map((task)=> 
      task.id===id?{...task, reminder:
      data.reminder}:task))
  }

  return (
    <Router>
      <div className="App">
        <Header onAddTask={()=>setShowAdd(!showAdd)} showAdd={showAdd}/>
      
        <Routes>
          <Route 
          path="/" exact
          element={
          <React.Fragment>
          {showAdd && <AddTask onAdd={addTask}/>}
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
          </React.Fragment>
          }
          />
      
      <Route path="/about" element={<About/>}/>
      </Routes>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
