import React, { useState} from 'react'
import { Link } from 'react-router-dom';
import CharacterList from '../components/CharacterList';
import StoryList from '../components/StoryList';

const UserPage = ({user, isLogged, characters, stories}) => {
   
  return (
    <div>
        <h1>{user.username}</h1>
        <div className="list-layout">
        <div className="charSheet">
            <h4>Characters</h4>
            {isLogged && <Link to="/character-creator"><button>Create New Character</button></Link>}
            <CharacterList characters={characters}/>
            {characters.length===0 && <p>This user has no characters</p>}
        </div> 
        <div className="storySheet">
            <h4>Stories</h4>
            {isLogged && <Link to="/story-creator"><button>Create New Story</button></Link>}
            <StoryList stories={stories}/>
        </div>
        </div>
    </div>
  )
}

export default UserPage