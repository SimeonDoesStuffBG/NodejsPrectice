import React, { Component } from "react";
import propTypes from 'prop-types';
import Link from './Link.js'

export default class Form extends Component{

    static propTypes = {
        onSubmitForm: propTypes.func.isRequired
    }
    state = {
        text:'',
        query : ''
    }

    changeText = (event)=>{
        this.setState({text:event.target.value})
    }
    submitForm = (event)=>{
        event.preventDefault();
        const Text = this.state.text.trim();
        if(Text.length > 0){
            this.state.query = "https://www.googleapis.com/books/v1/volumes?q=" + this.state.text.replace(" ", "+")
            this.setState({text:''});
            
            this.props.onSubmitForm(new Link(this.state.query));
            console.log(this.state.query);
        }
    }
    
    render(){
        return(
            <form className="Form" onSubmit={this.submitForm}>
                <input id="text" type = "text" placeholder = "Enter Search Terms" value = {this.setState.text} onChange = {this.changeText}/>
                <button type = "submit" className = "button">Query book</button>
            </form>
        )
    }
}