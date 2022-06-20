import React from 'react';
import PropTypes from 'prop-types';

const MyInput = ({type,name,onValueChange,value}) => {
  return (
    <tr>
        <td><label htmlFor={name}>{name}</label></td>
        <td><input type={type} id={name} value={value} onChange={e=>onValueChange(e)}/></td>
    </tr>
  )
}

MyInput.defaultProps={
    type:"text"
}

MyInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    onValueChange: PropTypes.func.isRequired
}

export default MyInput