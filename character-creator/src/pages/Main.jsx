import React from 'react'
import CharacterThumbnail from '../components/CharacterThumbnail';
import logo from '../logo.svg';

const Main = () => {
  return (
    <div>
         <CharacterThumbnail picture={logo} name="John" creator = "LeoTheBackgroundSheep" createdOn={new Date().toString()}/>
    </div>
  )
}

export default Main