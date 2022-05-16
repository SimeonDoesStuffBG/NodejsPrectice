import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";
import { Component } from "react";
import Counter from "./counter";


export default class CounterList extends Component{
    

    render(){
        const { onReset, counters, onIncrement, onDelete} = this.props;
        
        return(<div>
            <button onClick={onReset}>Reset</button>
            {counters.map(counter => 
                <Counter 
                    key={counter.id} 
                    onDelete={onDelete} 
                    onIncrement={onIncrement}
                    counter = {counter}
                >
                    <h4>Counter #{counter.id}</h4>
                </Counter>
            )}
        </div>);
    }
}