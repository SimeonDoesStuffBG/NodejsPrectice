import React, { Component,useState } from 'react';
import {ACTIVE, Gender, NA, USER} from '../components/enums';
import MyInput from '../components/MyInput';
import { User } from '../components/user';
import {PropTypes} from 'prop-types'

const SignIn = ({onSignIn})=> {    

    const [username, setUsername]=useState('');
    const [name, setName]=useState('');
    const [password,setPassword]=useState('');
    const [gender,setGender]=useState('');
    const [repeatPass,setRepeatPass]=useState('');

    const onSubmit = (e)=>{
        e.preventDefault();

        const curDate=new Date().toString();
        onSignIn({username,name,password,gender,curDate,curDate});

        setUsername('');
        setName('');
        setPassword('');
        setGender('');
        setRepeatPass('');
    }
    
       
   return (
       <form onSubmit={onSubmit}>
       <table><tbody>
           <tr>
               <td><label htmlFor="username">Username</label></td>
               <td><input type="text" id="username" value={username} onChange={e=>setUsername(e.target.value)}/></td>
            </tr>
            
            <tr>
               <td><label htmlFor="pass">Password</label></td>
               <td><input type="password" id="pass" value={password} onChange={e=>setPassword(e.target.value)}/></td>
            </tr>

            <tr>
               <td><label htmlFor="passRep">Reenter Password</label></td>
               <td><input type="password" id="passRep" value={repeatPass} onChange={e=>setRepeatPass(e.target.value)}/></td>
            </tr>

            <tr>
               <td><label htmlFor="naem">Full Name</label></td>
               <td><input type="text" id="name" value={name} onChange={e=>setName(e.target.value)}/></td>
            </tr>
            
            <tr>
               <td><label htmlFor="gender">Gender</label></td>
               <td><input type="text" id="gender" value={gender} onChange={e=>setGender(e.target.value)}/></td>
            </tr>
           
            </tbody></table>
               
                <input type='submit'/>
            </form>
        );
}
 
SignIn.propTypes={
    onSignIn:PropTypes.func.isRequired
}

export default SignIn;