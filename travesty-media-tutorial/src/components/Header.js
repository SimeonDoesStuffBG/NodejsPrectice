import React from 'react'
import Button from './Button'

const Header = (props) => {
  return (
    <header className='header'>
        <h1>Task Tracker</h1>
        <Button color={props.showAdd?'crimson':'green'} text={props.showAdd?'Close':'Add'} onClick={props.onAddTask}/>
    </header>
  )
}

export default Header

