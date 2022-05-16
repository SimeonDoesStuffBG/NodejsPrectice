import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";
import { Component } from "react";
import Counter from "./counter";

export default class CounterList extends Component{
    state = {
        counters: [
            {id :1, value: 20},
            {id :2, value: 0},
            {id :3, value: 0},
            {id :4, value: 0}
        ]
    }

    handleDelete = (counterID) => {
        const counters = this.state.counters.filter(c=>c.id !== counterID);
        this.setState({counters});
    }

    handleIncrement = (counter) => { 
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index]={ ...counter };
        counters[index].value++;
        this.setState({counters});
       
    }

    handleReset = ()=>{
       const counters= this.state.counters.map(c=>{
           c.value = 0;
           return c;
       });
       this.setState({counters});
    }

    render(){
        return(<div>
            <button onClick={this.handleReset}>Reset</button>
            {this.state.counters.map(counter => 
                <Counter 
                    key={counter.id} 
                    onDelete={this.handleDelete} 
                    onIncrement={this.handleIncrement}
                    counter = {counter}
                >
                    <h4>Counter #{counter.id}</h4>
                </Counter>
            )};
        </div>);
    }
}