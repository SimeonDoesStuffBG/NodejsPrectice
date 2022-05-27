import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
        <p>Why hello there.</p>
        <Link to='/about'>Cool shit</Link>
    </footer>
  )
}

export default Footer