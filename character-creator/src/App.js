import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import Nav from './components/Nav';


function App() {
  const serverURL = "http://localhost:5000";

  const onSignIn = ()=>{

  }

  return (
    <Router className="App">
      <Nav />
      <Routes>
        
        <Route path="/" exact element={<Main />}/>
        <Route path="/sigin" element={<SignIn onSignIn={onSignIn}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
