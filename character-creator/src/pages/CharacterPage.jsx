import React from 'react'

const CharacterPage = ({char}) => {
    console.log(char);
  return (
    <div>{char.name}</div>
  )
}

export default CharacterPage