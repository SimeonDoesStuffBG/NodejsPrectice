import React, { useEffect, useState } from 'react'
import CharacterThumbnail from '../components/CharacterThumbnail';
import logo from '../logo.svg';

const Main = ({characters}) => {

  return (
    <div className="Characters">
         {characters.map(character=><CharacterThumbnail key={character.id} character={character}/>)}
    </div>
  )
}

export default Main