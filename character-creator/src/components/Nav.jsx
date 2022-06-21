import React from 'react'
import {Link} from 'react-router-dom'
const Nav = () => {
  return (
    <div>
        <Link to="/"> Main Page</Link>
        <Link to="/sigin">Sign in</Link>
    </div>
  )
}

export default Nav