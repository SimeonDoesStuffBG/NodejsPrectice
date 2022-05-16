import React, { Component } from 'react';

class Counter extends Component {
    

    formatCount(){
        const {value} = this.props.counter;
        return value === 0?"Zero":value; 
    }

   
    render() { 
        return (
        <React.Fragment>
            {this.props.children}
            <span>{this.formatCount()}</span>
            <button onClick={()=>this.props.onIncrement(this.props.counter)}>Increment</button>
            <button onClick={()=>this.props.onDelete(this.props.counter.id)}>Delete</button>
            <br/>
        </React.Fragment>
        );
    }

 
}
 
export default Counter;