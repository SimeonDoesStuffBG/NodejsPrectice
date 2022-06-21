import React from 'react'
import PropTypes from 'prop-types'

const CharacterThumbnail = ({picture,name,creator,createdOn}) => {
  return (
    <div className="ThumbnailChar">
        <img src= {picture} alt="Thumbnail"/>
        <h5>{name}</h5>
        <p><span>{creator}</span> <span>{createdOn}</span></p>
    </div>
  )
}

CharacterThumbnail.propTypes = {
    picture:PropTypes.string,
    name:PropTypes.string.isRequired,
    creator:PropTypes.string.isRequired,
    createdOn:PropTypes.string.isRequired
}

export default CharacterThumbnail