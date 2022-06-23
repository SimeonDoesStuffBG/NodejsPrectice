import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CharacterThumbnail = ({picture,name,creator}) => {
  return (
 
    //<Link to={`/character=${character.id}`} className="ThumbnailChar">
    <div className="ThumbnailChar">
        <img src= {picture} alt="Thumbnail"/>
        <div>
          <h4>{name}</h4>
          <p>{creator}</p>
        </div>
    </div>
   // </Link>
  )
}

CharacterThumbnail.propTypes = {
    picture:PropTypes.string,
    name:PropTypes.string.isRequired,
    creator:PropTypes.string.isRequired,
}

export default CharacterThumbnail