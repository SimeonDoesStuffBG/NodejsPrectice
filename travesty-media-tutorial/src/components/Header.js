import React from 'react';
import Button from './Button';
import {useLocation} from 'react-router-dom';


const Header = (props) => {
  const location = useLocation();
  return (
    <header className='header'>
        <h1>Task Tracker</h1>
        {location.pathname==='/'&&<Button color={props.showAdd?'crimson':'green'} text={props.showAdd?'Close':'Add'} onClick={props.onAddTask}/>}
    </header>
  )
}

export default Header

