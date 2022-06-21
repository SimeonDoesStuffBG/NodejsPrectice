import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import Nav from './components/Nav';
import {useState} from 'react';
import Login from './pages/Login';

function App() {
  const serverURL = "http://localhost:5000/";

  const [user,setUser] = useState(-1);

  const userExists = async(username,email)=>{
    const res = await fetch(`${serverURL}users`);
    let data = await res.json();
    data=data.filter(user=>user.username===username||user.email===email);

    //console.log(data[0]);
    return data[0];
  }

  const onLogIn = async(username, password)=>{
    const user = await userExists(username, '');
    if(user===undefined || user.password!=password){
      alert("Wrong Username or Password");
      return false;
    }
    setUser(user.id);
    return true;
  }

  const onSignIn = async (user)=>{
    if(await userExists(user.username, user.email)!=undefined){
      alert("User already exists");
      return false;
    }
    await fetch(`${serverURL}users`,{
      method:'POST',
      headers:{ 
        'Content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    return true;
  }

  
  return (
    <Router className="App">
      <Nav loggedUser={user}/>
      <Routes>
        
        <Route path="/" exact element={<Main />}/>
        <Route path="/sigin" element={<SignIn onSignIn={onSignIn}/>}/>
        <Route path="/login" element={<Login onLogIn={onLogIn}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
