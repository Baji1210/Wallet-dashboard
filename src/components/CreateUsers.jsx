import axios from 'axios';
import React, { useState } from 'react'

const CreateUsers = () => {
  const [username, setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  
  const handleCancel = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('');
    setError('');
  }
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!username || !email || !password || !role) {
      setError('Please fill all the fields');
      return;
    }

    try{
      const response = await axios.post('http://localhost:3001/users',{username,email,password,role});

      console.log('User Created Successfully', response.data);
      setError('')
      setUsername('');  
      setEmail('');
      setPassword('');
      setRole('');
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className='createusers'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>UserName</label>
          <input type="text" placeholder='Enter UserName' value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div>
          <label>Email</label>
          <input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div>
          <label>Password</label>
          <input type='password' placeholder='Enter Password'value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="" disabled selected>Select your role</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>{error}</div>
        <div>
          <button onClick={handleCancel}>Cancel</button>
          <button type='submit'>CreateUser</button>
        </div>
      </form>
    </div>
  )
}

export default CreateUsers
