import './App.css';
import CounterList from './components/counterList';
import Navbar from './components/navbar';
import React, { Component } from 'react';

class App extends Component{

  state = {
    counters: [
        {id :1, value: 20},
        {id :2, value: 0},
        {id :3, value: 0},
        {id :4, value: 0}
    ]
}

constructor(){
  super();
  console.log('fsdf');
}

componentDidMount(){
  //ajaxCall
  console.log('mounted')
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

render() {  return (
   <React.Fragment>
     <Navbar totalCounters={this.state.counters.filter(c=>c.value > 0).length}/>
      <main className="container">
        <CounterList 
        counters = {this.state.counters}
        onReset={this.handleReset} 
        onIncrement={this.handleIncrement}
        onDelete={this.handleDelete} />
    </main>
   </React.Fragment>
  );
}
}

export default App;
