import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{backgroundColor:'green', padding:'8px'}}>
        <Link to='/' className='link'>Main Page</Link>
        <Link to='/signin' className='link'>Sign in</Link>
        <Link to='/login' className='link'>Log in</Link>
    </nav>
  )
}

export default Navbar