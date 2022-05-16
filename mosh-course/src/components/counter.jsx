import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count: 0,
        tags: ['tag1', 'tag2', 'tag34','afodsiahf3']
    };

    

    formatCount(){
        const {count} = this.state;
        return count === 0?"Zero":count;
    }

    renderStyle() {
        let classes = "badge m-2 badge-";
        classes += (this.state.count === 0) ? "warning" : "primary";
        return classes;
    }

    renderTags(){
        if(this.state.tags.length === 0) return <p>No tags to speak of</p>;
        return <ul>{this.state.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>
    }

    handleIncrement = ()=>{
        this.setState({count:this.state.count+1});
    }

    render() { 
        return (
        <React.Fragment>
            <span>{this.formatCount()}</span>
            <button onClick={this.handleIncrement}>Increment</button>
            {this.state.tags.length === 0 && 'Please add tags'}
            {this.renderTags()}
        </React.Fragment>
        );
    }

 
}
 
export default Counter;