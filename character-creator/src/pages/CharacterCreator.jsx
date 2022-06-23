import React from 'react'
import {PropTypes} from 'prop-types';

const CharacterCreator = ({onCreate}) => {
  return (
    <form>
        <table>
            
        </table>
        <input type="submit" value="Create Character"/>
    </form>
  )
}

CharacterCreator.propTypes = {
    onCreate:PropTypes.func.isRequired
}

export default CharacterCreator