import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import Nav from './components/Nav';
import {useState, useEffect} from 'react';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import CharacterCreator from './pages/CharacterCreator';

function App() {
  const serverURL = "http://localhost:5000/";

  const [users, setUsers]= useState([]);
  const [user,setUser] = useState(-1);

  useEffect(() => {
    const getUsers = async()=>{
      const usersFromServer = await fetchUsers();
      setUsers(usersFromServer);
    }

    getUsers();
  },[]);

  const fetchUsers = async()=>{
    const res = await fetch(`${serverURL}users`);
    let data = await res.json();

    return data;
  }

  const userExists = async(username,email)=>{
    let users = await fetchUsers();
    let data=users.filter(user=>user.username===username||user.email===email);

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
    const res = await fetch(`${serverURL}users`,{
      method:'POST',
      headers:{ 
        'Content-type':'application/json'
      },
      body:JSON.stringify(user)
    })
    
    const newUser= await res.json();
    setUsers([...users, newUser]);

    return true;
  }

  const onCreateCharacter=async (char)=>{
    return true;
  }
  
  return (
    <Router className="App">
      <Nav loggedUser={user}/>
      <Routes>
        
        <Route path="/" exact element={<Main />}/>
        <Route path="/sigin" element={<SignIn onSignIn={onSignIn}/>}/>
        <Route path="/login" element={<Login onLogIn={onLogIn}/>}/>
        <Route path="/character-creator" element={<CharacterCreator onCreate={onCreateCharacter}/>}/>
        {users.map(user=><Route key={user.id} path={`/user=${user.id}`} element={<UserPage user={user}/>}/>)}
      </Routes>
    </Router>
  );
}

export default App;
