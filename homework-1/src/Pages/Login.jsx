import React from 'react'
import MyInput from '../components/MyInput'

const Login = () => {
  return (
    <form>
        <table style={{alignContent:'center'}}><tbody>
            <MyInput name='Username'/>
            <MyInput name='Password' type='password'/>    
        </tbody></table>
            <input type="submit"/>
    </form>
  )
}

export default Login