import React, { useEffect, useState } from 'react'
import CharacterList from '../components/CharacterList';
import StoryList from '../components/StoryList';
import logo from '../logo.svg';

const Main = ({characters, stories}) => {

  return (
    <div className="list-layout">
        <CharacterList characters={characters} />
        <StoryList stories={stories} />
    </div>
  )
}

export default Main