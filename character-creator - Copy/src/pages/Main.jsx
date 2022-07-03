import React, { useEffect, useState } from 'react'
import CharacterList from '../components/CharacterList';
import StoryList from '../components/StoryList';
import logo from '../logo.svg';

const Main = ({characters, stories}) => {

  return (
    <div className="list-layout">
        <div>
          <h3>Characters</h3>
          <CharacterList characters={characters} />
        </div>
        <div>
          <h3>Stories</h3>
          <StoryList stories={stories} />
        </div>
    </div>
  )
}

export default Main