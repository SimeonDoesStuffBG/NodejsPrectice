import React, { Component } from 'react';
import {GENDER} from './enums'
class User extends Component {
    state = { 
        name: "Lea",
        role: 'user',
        gender: 'Non-Binary',
        intro: "Hi I'm Lea"
     } 
    render() { 
        return (
            <React.Fragment>
                <h4>{this.state.name}</h4>
                <p>{this.state.role}</p>
                <p>{this.state.gender}</p>
                <p>{this.state.intro}</p>
            </React.Fragment>
        );
    }
}
 
export default User;