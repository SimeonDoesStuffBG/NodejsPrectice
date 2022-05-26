import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import {useState} from 'react'

function App() {

  const [tasks,setTasks]=useState([{id:1,text:'doctor', day:'May 27', reminder:true}])


  return (
    <div className="App">
      <Header title = "Add"/>
      <Tasks tasks={tasks}/>
    </div>
  );
}

export default App;
