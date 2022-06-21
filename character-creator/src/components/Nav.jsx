import React from 'react'
import {Link} from 'react-router-dom'
import {PropTypes} from 'prop-types'

const Nav = (loggedUser) => {
  return (
    <div>
        <Link to="/"> Main Page</Link>
        {loggedUser && <div className="userEnter">
        <Link to="/sigin">Sign in</Link>
        <Link to="/login">Log in</Link>
        </div>}
    </div>
  )
}

Nav.propTypes = {
    loggedUser: PropTypes.bool
}

Nav.defaultProps = {
    loggedUser: false
}

export default Nav