import React, { useState } from 'react';
import {PropTypes} from 'prop-types'
import MyInput from '../components/MyInput';

const SignIn = ({onSignIn})=> {    

    const [username, setUsername]=useState('');
    const [name, setName]=useState('');
    const [password,setPassword]=useState('');
    const [gender,setGender]=useState('');
    const [repeatPass,setRepeatPass]=useState('');

    const onSubmit = (e)=>{
        e.preventDefault();
        
        
        const dateOfReg=new Date().toString();
        const dateOfLast=dateOfReg;
        console.log(JSON.stringify({username,name,password,gender,dateOfReg,dateOfLast}));
        onSignIn({username,name,password,gender,dateOfReg,dateOfLast});

        setUsername('');
        setName('');
        setPassword('');
        setGender('');
        setRepeatPass('');
    }
    
       
   return (
       <form onSubmit={onSubmit}>
       <table><tbody>
            <MyInput name="Username" type="text" value={username} onValueChange={e=>setUsername(e.target.value)}/>
            <MyInput name="Password" type="password" value={password} onValueChange={e=>setPassword(e.target.value)}/>
            <MyInput name="Reenter Password" type="password" value={repeatPass} onValueChange={e=>setRepeatPass(e.target.value)}/>
            <MyInput name="Full Name" type="text" value={name} onValueChange={e=>setName(e.target.value)}/>
            <MyInput name="Gender" type="text" value={gender} onValueChange={e=>setGender(e.target.value)}/>
            </tbody></table>
               
                <input type='submit'/>
            </form>
        );
}
 
SignIn.propTypes={
    onSignIn:PropTypes.func.isRequired
}

export default SignIn;