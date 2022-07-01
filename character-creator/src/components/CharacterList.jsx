import React, { useState } from 'react'
import CharacterThumbnail from './CharacterThumbnail'

const CharacterList = ({characters}) => {
    const [filter, setFilter] = useState('');

    const lookFor = (string,filter)=>{
        return filter==='' || string.toUpperCase().includes(filter.toUpperCase());
    }

    return (
    
    <div className="list-container">
        <input className="SearchBar" type="text" value={filter} onChange={e=>setFilter(e.target.value)} placeholder="SearchCharacter"/>
        <div className="list">{characters.filter(char=>lookFor(char.name,filter)).map(character=><CharacterThumbnail key={character.id} character={character}/>)}</div>
    </div>
  )
}

export default CharacterList