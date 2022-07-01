import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

const CharacterThumbnail = ({character}) => {
  
  const [creator,setCreator]=useState('[deleted]');

  useEffect(()=>{
    const getCreator = async()=>{
      if(character.creator!==-1){
        const theCreator = await fetch(`http://localhost:5000/users/${character.creator}`);
        const data =await theCreator.json();
        setCreator(data.username);
      }
    }
    getCreator();
  },[]
  )

  return (
 
    <div className="Thumbnail-char">
    <Link to={`/character=${character.id}`}>
        <img src= {character.picture} alt="Thumbnail"/>
        <div>
          <h4>{character.name}</h4>
          <p>{creator}</p>
        </div>
    </Link>
    </div>
  )
}



export default CharacterThumbnail