import React, { useState} from 'react'
import { Link } from 'react-router-dom';

const UserPage = ({user, isLogged}) => {
   
    const [characters, setCharacters]=useState([]);
    const [stories, setStories]=useState([]);
  return (
    <div>
        <h1>{user.username}</h1>
        <div className="charSheet">
            <h4>Characters</h4>
            {isLogged && <Link to="/character-creator"><button>Create New Character</button></Link>}
        </div> 
        <div className="storySheet">
            <h4>Stories</h4>
        </div>
    </div>
  )
}

export default UserPage