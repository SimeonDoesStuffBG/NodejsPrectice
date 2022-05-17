import React, { Component } from 'react';
import {ACTIVE, Gender, NA, USER} from '../components/enums';
import { User } from '../components/user';

class SignIn extends Component {
    state = { 
        username:'',
        name:'',
        pass:'',
        pass2:'',
        gender:NA
     } 

    SubmitSignIn= (event)=>{
        event.preventDefault();
        const Username = this.state.username.trim();
        if(Username.length == 0||Username.length>15||Username != this.state.username){
            alert("Invalid Username");
            return;
        }

        const Pass = this.state.pass.trim();
        if(Pass.length < 8 || Pass!=this.state.pass){
            alert("invalid Password");
            return;
        }
        if(Pass!=this.state.pass2){
            alert("Passwords do not match");
            return;
        }

        const Name = this.state.name.trim();
        if(Name.length<=0){
            alert("You must Enter Username");
            return;
        }

        var user = new User("s",Name, Username,Pass,this.state.gender);
        
        var U = Window.localStoage.getItem('users');
        console.log('FUCK');
        var Users = (!U)? JSON.parse(U):[];
        Users.push(user);
        Window.localStoage.setItem('users', JSON.stringify(Users));

    }

    changeUN = (event) =>{
        this.setState({username:event.target.value});
    }

    changePass = (event) =>{
        this.setState({pass:event.target.value});
    }

    changePass2 = (event) =>{
        this.setState({pass2:event.target.value});
    }

    changeName = (event) =>{
        this.setState({name:event.target.value});
    }

    changeGender = (event) =>{
        this.setState({gender:event.target.value});
    }

    
    render() { 
        
        return (
            <form onSubmit={this.SubmitSignIn}>
                <input type='text' placeholder='enter username' onChange={this.changeUN}/><br/>
                <input type='password' placeholder='enter password' onChange={this.changePass}/><br/>
                <input type='password' placeholder='repeat password' onChange={this.changePass2}/><br/>
                <input type='text' placeholder='enter full name' onChange={this.changeName}/><br/>
                <select id='gender' onChange={this.changeGender}>
                    {Gender.map(g =>
                        <option key={g} value={Gender.indexOf(g)}>{g}</option>)
                    }
                
                </select><br/>
                <input type='submit'/>
            </form>
        );
    }
}
 
export default SignIn;