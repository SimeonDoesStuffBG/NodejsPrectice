import {Component} from "react";
import {Todo} from "../model/todo-model.js";
import PropTypes from "prop-types";

export default class TodoInput extends Component{
    static propTypes ={
        onCreateTodo: PropTypes.func.isRequired
    }

    state = {
        text:''
    }
    
    handleTextChange = (event) => {
        this.setState({text: event.target.value});
    }

    handleTodoSubmit = (event)=>{
        event.preventDefault();
        const text = this.state.text.trim();
        if(text.length > 0){
            this.props.onCreateTodo(new Todo(text));
            this.setState({text: ''});
        }
    }

    render(){
        return (
            <form className = "TodoInputContainer" onSubmit = {this.handleTodoSubmit}>
                <label htmlFor="Todo-Text">What to do Next: </label>
                <input type="text" id="Todo-Text" name="Todo-Text" value={this.state.text} onChange={this.handleTextChange}/>
                <button className="button-buttonS" type="submit">Submit</button>
            </form>
        );
    }


}