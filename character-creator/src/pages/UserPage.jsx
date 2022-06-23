import React, { useState} from 'react'
import { Link } from 'react-router-dom';
import CharacterThumbnail from '../components/CharacterThumbnail';

const UserPage = ({user, isLogged, characters}) => {
   
    const [stories, setStories]=useState([]);
  return (
    <div>
        <h1>{user.username}</h1>
        <div className="charSheet">
            <h4>Characters</h4>
            {isLogged && <Link to="/character-creator"><button>Create New Character</button></Link>}
            {characters.map(char=><CharacterThumbnail key={char.id} character={char}/>)}
            {characters.length===0 && <p>This user has no characters</p>}
        </div> 
        <div className="storySheet">
            <h4>Stories</h4>
        </div>
    </div>
  )
}

export default UserPage