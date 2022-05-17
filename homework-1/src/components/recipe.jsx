import React, { Component } from 'react';

class Recipe extends Component {
    state = {  } 
    render() { 
        return (<div>
            <h4>{this.state.name}</h4>
            <h6>{this.state.sharedBy}</h6>
            <p>{this.state.description}</p>
            
        </div>);
    }
}
 
export default Recipe;