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
            <MyInput type="text" name="Username" value={username} onValueChange={(e)=>setUsername(e.target.value)}/>
            <MyInput type="password" name="Password" onValueChange={(e)=>setPassword(e.target.value)}/>
            <MyInput name="Reenter Password" type="password" onValueChange={(e)=>setRepeatPass(e.target.value)}/>
            <MyInput name="Full Name" onValueChange={e=>setName(e.target.value)}/>
            <MyInput name="Gender" type="text" onValueChange={e=>setGender(e.target.value)}/>
            </tbody></table>
               
                <input type='submit'/>
            </form>
        );
}
 
SignIn.propTypes={
    onSignIn:PropTypes.func.isRequired
}

export default SignIn;