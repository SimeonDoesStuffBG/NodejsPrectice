import React, { useState } from 'react'
import CharacterThumbnail from './CharacterThumbnail'

const CharacterList = ({characters}) => {
    const [filter, setFilter] = useState('');

    const lookFor = (string,filter)=>{
        return filter==='' || string.toUpperCase().includes(filter.toUpperCase());
    }

    return (
    
    <div className="characterList">
        <input type="text" value={filter} onChange={e=>setFilter(e.target.value)} placeholder="SearchCharacter"/>
        {characters.filter(char=>lookFor(char.name,filter)).map(character=><CharacterThumbnail key={character.id} character={character}/>)}
    </div>
  )
}

export default CharacterList