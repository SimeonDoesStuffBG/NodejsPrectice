import React, { useState } from 'react';
import {PropTypes} from 'prop-types';
import {useNavigate} from 'react-router-dom';
import MyInput from '../components/MyInput';

const SignIn = ({onSignIn})=> {    

    const [username, setUsername]=useState('');
    const [email, setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [repeatPass,setRepeatPass]=useState('');

    const nav = useNavigate();

    const onSubmit = (e)=>{
        e.preventDefault();
        let trimName= username.trim();
        if(trimName===''||trimName!=username){
            alert('Enter Valid Username');
            return;
        }

        if(password.trim()===''||password.trim()!=password){
            alert('Enter Valid Password');
            return;
        }
        if(password!=repeatPass){
            alert("Passwords don't match");
            return;
        }

        if(email.trim()===''){
            alert("Enter valid Email");
            return;
        }

        const dateOfReg=new Date().toString();
        const dateOfLast=dateOfReg;
        if(onSignIn({username,email,password,dateOfReg,dateOfLast})){
            setUsername('');
            setEmail('');
            setPassword('');
            setRepeatPass('');
            nav('/login');
        }
}
    
       
   return (
       <form onSubmit={onSubmit}>
       <table><tbody>
            <MyInput name="Username" type="text" value={username} onValueChange={e=>setUsername(e.target.value)}/>
            <MyInput name="Password" type="password" value={password} onValueChange={e=>setPassword(e.target.value)}/>
            <MyInput name="Reenter Password" type="password" value={repeatPass} onValueChange={e=>setRepeatPass(e.target.value)}/>
            <MyInput name="E-mail" type="email" value={email} onValueChange={e=>setEmail(e.target.value)}/>
            </tbody></table>
               
                <input type='submit'/>
            </form>
        );
}
 
SignIn.propTypes={
    onSignIn:PropTypes.func.isRequired
}

export default SignIn;