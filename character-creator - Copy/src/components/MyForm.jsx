import React from 'react'
import PropTypes from 'prop-types';

const MyForm = (props,{submitting, submitText}) => {

    const onSubmit = e=>{
        e.preventDefault();
        submitting(e);
    }

    return (
    <form onSubmit={onSubmit}>
        <table>
            <tbody>
            {props.children.filter(child=>child.type!=="table")}
            </tbody>
        </table>
        {props.children.filter(child=>child.type==="table")}
        <input type="submit" value={submitText}/>
    </form>
  )
}

MyForm.propTypes = {
    submitting:PropTypes.func.isRequired,
    submitText: PropTypes.string
}

MyForm.defaultProps = {
    submitText:"submit"
}

export default MyForm