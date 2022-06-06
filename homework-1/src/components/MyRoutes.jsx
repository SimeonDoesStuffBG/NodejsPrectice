import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from '../Pages/Main'
import SignIn from '../Pages/SignIn'
import Login from '../Pages/Login'

const MyRoutes = () => {
  return (
    <Routes>
        <Route path="/" exact element={<Main/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default MyRoutes