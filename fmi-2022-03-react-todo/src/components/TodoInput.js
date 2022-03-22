import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Todo} from '../model/todo-model.js'

export default class TodoInput extends Component{
    static propTypes = {
        onSubmitTodo: PropTypes.func.isRequired
    }
    state = {
        text: ''
    }

    changeText = (event)=>{
        this.setState({text:event.target.value});
    }

    submitTodo = (event)=>{
        event.preventDefault();
        const Text = this.state.text.trim();
        if(Text.length > 0){
            this.setState({text:''});
            this.props.onSubmitTodo(new Todo(Text));
    }
}
    render(){
        return(
            <form className="TodoInput-form" onSubmit = {this.submitTodo}>
                <input id = "text" type = "text" placeholder = "Meep" value = {this.setState.text} onChange = {this.changeText}/>
                <button type = "submit" className="button1">Add To Do</button>
            </form>
        )
    }
}