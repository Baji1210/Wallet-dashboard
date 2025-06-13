import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './CreateUsers.css'
const CreateUsers = () => {
  const { setCreateusers } = useOutletContext()
  const navigate = useNavigate()
  const [form, setForm] = React.useState({ username: '', email: '', password: '', role: 'user' });
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.username || !form.email || !form.password || !form.role) {
    setError('All fields are required');
    return;
  }
  try {
    const response = await fetch('http://localhost:3004/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!response.ok) throw new Error('Failed to create user');
    setForm({ username: '', email: '', password: '', role: 'user' });
    setError('');
    setSuccess('User created');
    setTimeout(() => setSuccess(''), 2000); // Optional: clear after 2 seconds
    // Do NOT navigate or close the form here
  } catch (err) {
    setError('Failed to create user');
  }
};

  return (
    <div className='createUsers'>
      <div className="headings">
        <h1>Create User</h1>
      </div>
      <div className="creationform">
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <table>
            <thead>
              <tr>
                <th>username</th>
                <th>email</th>
                <th>password</th>
                <th>role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input name="username" type="text" value={form.username} onChange={handleChange} placeholder="Username" required />
                </td>
                <td>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                </td>
                <td>
                  <input name="password" type="text" value={form.password} onChange={handleChange} placeholder="Password" required />
                </td>
                <td>
                  <select name="role" value={form.role} onChange={handleChange} required>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Superadmin</option>
                  </select>
                </td>
                <td>
                  <button type="submit">Create</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}>
                  {error && <span style={{ color: 'red', marginLeft: '1rem' }}>{error}</span>}
                  {success && <span style={{ color: 'green', marginLeft: '1rem' }}>{success}</span>}
                </td>
              </tr>
            </tfoot>
          </table>
      </form>
      <div 
        className="close"
        onClick={() => { setCreateusers(false); navigate('/superadmin/manageusers') }}
        style={{ cursor: 'pointer' }}
      >
        <img src="/assets/main/Close.png" alt="" />
      </div>
      </div>
    </div>
  );
};

export default CreateUsers;