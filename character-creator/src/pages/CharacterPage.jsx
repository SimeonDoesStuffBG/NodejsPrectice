import React from 'react'

const CharacterPage = ({char}) => {
    console.log(char);
  return (
    <div>
      <h1>{char.name}</h1>
      <h4>Created by </h4>
    </div>
  )
}

export default CharacterPage