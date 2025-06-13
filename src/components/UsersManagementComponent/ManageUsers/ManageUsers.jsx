import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import './ManageUsers.css'

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', password: '', role: '' });
  const [showPassword, setShowPassword] = useState(null); // null or user.id

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3004/users');
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:3004/users/${id}`);
      fetchUsers();
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setForm({
      username: user.username,
      email: user.email || user.Email,
      password: user.password,
      role: user.role
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3004/users/${editingUser}`, form);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  
  const[createusers,setCreateusers] = useState(false)
  const navigate = useNavigate()
  const createUser = () => {
    navigate('/superadmin/manageusers/createusers')
    setCreateusers(true)
  }
  return (
    <div className='manageusers'>
      {createusers ? (
        <>
          <Outlet context={{setCreateusers}}/>  
        </>) : (
        <>
        <div className="heading">
          <h1>Manage Users</h1>
        </div>
      <div className="table">
        <table>
        <thead>
          <tr>
            <th>Username</th><th>Email</th><th colSpan={2}>Password</th><th>Role</th><th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
          <tr key={user.id}>
            {editingUser === user.id ? (
            <>  
          <td>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
              placeholder="Username"
            />
          </td>
          <td>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              placeholder="Email"
              
            />
          </td>
          <td>
            <input
              type="text"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              placeholder="Password"
            />
          </td>
          <td></td>
          <td>
            <select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </td>
          <td colSpan={2} style={{display:'flex'}}>
            <button onClick={handleUpdate} type="button">Update</button>
          </td>
          <td>
            <button onClick={() => setEditingUser(null)} type="button">Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{user.username}</td>
          <td>{user.email || user.Email}</td>
          <td>
            <input
              type={showPassword === user.id ? "text" : "password"}
              value={user.password}
              readOnly
              style={{width:'200px',background:'transparent',border:'none'}}
            />
          </td>
          <td>
            <h2  onClick={() => setShowPassword(showPassword === user.id ? null : user.id)} 
            style={{ border:'none',background:'transparent'}}>
              {showPassword === user.id ? <FaEyeSlash /> : <FaEye />}
            </h2  >
          </td>
          <td>{user.role}</td>
          <td>
            <button onClick={() => handleEditClick(user)} >Edit</button>
          </td>
          <td>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </td>
          </>
          )}
        </tr>
      ))}
      </tbody>
      <tfoot>
        <td colSpan={7}>
          <button onClick={createUser}>Create New User</button>
        </td>
      </tfoot>
      </table>
      <div 
        className="close"
        onClick={() => navigate('/superadmin/walletlimits')}
        style={{ cursor: 'pointer' }}
      >
        <img src="/assets/main/Close.png" alt="" />
      </div>
      </div>
      {/* {editingUser && (
        <form onSubmit={handleUpdate} style={{ marginTop: '2rem' }}>
          <h3>Edit User</h3>
          <input type="text" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required placeholder="Username" />
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="Email" />
          <input type="text" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required placeholder="Password" />
          <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )} */}
      </>
      )}
    </div>
  );
};

export default ManageUsers;