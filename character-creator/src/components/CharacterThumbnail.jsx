import React from 'react'
import PropTypes from 'prop-types'

const CharacterThumbnail = ({picture,name,creator}) => {
  return (
    <div className="ThumbnailChar">
        <img src= {picture} alt="Thumbnail"/>
        <div>
          <h4>{name}</h4>
          <p>{creator}</p>
        </div>
    </div>
  )
}

CharacterThumbnail.propTypes = {
    picture:PropTypes.string,
    name:PropTypes.string.isRequired,
    creator:PropTypes.string.isRequired,
}

export default CharacterThumbnail