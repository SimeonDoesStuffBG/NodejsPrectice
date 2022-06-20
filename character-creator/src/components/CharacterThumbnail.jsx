import React from 'react'
import PropTypes from 'prop-types'
const CharacterThumbnail = (immage,name,creator,createdOn) => {
  return (
    <div>
        <img src= {immage} alt="Thumbnail"></img>
        <h5>{name}</h5>
        <p><span>{creator}</span><span>{createdOn}</span></p>
    </div>
  )
}

CharacterThumbnail.propTypes = {
    immage:PropTypes.string,
    name:PropTypes.string.isRequired,
    creator:PropTypes.string.isRequired,
    date:PropTypes.string.isRequired
}

export default CharacterThumbnail