import React, { useState,useCallback } from 'react';
import './App.css';
import Main from './Pages/Main'
import Login from './Pages/Login'
import SignIn from './Pages/SignIn';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const [user,setUser] = useState('');

  const addUser = async (user)=>{
    await fetch('http://localhost:5000/api/users',{
      method:'POST',
      headers:{ 
        'Content-Type':'application/json' 
      },
      body:JSON.stringify(user)
    }).then(response => response.json())
    .then(res => console.log(res));;
    //console.log(user);


  }

  return (
    <Router>
    <div className="App">
     <Navbar/>
     <Routes>
        <Route path="/" exact element={<Main/>}/>
        <Route path="/signin" element={<SignIn onSignIn={addUser}/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
