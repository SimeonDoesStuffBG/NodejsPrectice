import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import MyInput from '../components/MyInput';
import {PropTypes} from 'prop-types';

const Login = ({onLogIn}) => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');

  const nav = useNavigate();

  const onSubmit = (e)=>{
    e.preventDefault();

    if(onLogIn(username, password)){
      setUsername('');
      setPassword('');
      nav('/');
    }else return;
  }

  return (
    <form onSubmit={onSubmit}>
        <table style={{alignContent:'center'}}><tbody>
            <MyInput name='Username' value={username} onValueChange={e=>setUsername(e.target.value)}/>
            <MyInput name='Password' type='password' value={password} onValueChange={e=>setPassword(e.target.value)}/>    
        </tbody></table>
            <input type="submit"/>
    </form>
  )
}

Login.propTypes = {
  onLogIn:PropTypes.func.isRequired
}

export default Login