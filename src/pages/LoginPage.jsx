import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
const LoginPage = () => {
  const Navigate = useNavigate()
  const [emailorusername, setEmailorusername] = useState('')
  const [password, setPassword] = useState('')
  const [error,setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.get('http://localhost:3004/users')
      const matchedUsers = response.data.find((user) => {
        return(user.username === emailorusername || user.email === emailorusername) && user.password === password
      })
      if(matchedUsers){
        console.log('login successful');
        setError('')

        switch(matchedUsers.role){
          case 'user':
            Navigate('/user')
          break;
          case 'admin':
            Navigate('/admin')
          break;
          case 'superadmin':
            Navigate('/superadmin')
          break;
          default:
            setError('unkown role')
        }
      }
      else{
        setError('Invalid credentials')
      }

     
    }
    catch(error){
      console.error('SERVER ERROR:', error)
      setError('SERVER ERROR PLEASE TRY AGAIN LATER')
    }
  }
  return (
    <div className='login-container'>
      <form onSubmit={handleLogin}>
        <input type="text" value={emailorusername} placeholder='username or email' onChange={(e) => setEmailorusername(e.target.value)}/>
        <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default LoginPage
