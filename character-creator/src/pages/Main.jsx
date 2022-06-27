import React, { useEffect, useState } from 'react'
import CharacterList from '../components/CharacterList';
import CharacterThumbnail from '../components/CharacterThumbnail';
import logo from '../logo.svg';

const Main = ({characters}) => {

  return (
    <div className="Characters">
        <CharacterList characters={characters} />
    </div>
  )
}

export default Main