import React from 'react'
import CharacterThumbnail from '../components/CharacterThumbnail';
import logo from '../logo.svg';

const Main = () => {
  return (
    <div>
         <CharacterThumbnail picture={logo} name="John" creator = "LeoTheBackgroundSheep"/>
    </div>
  )
}

export default Main