import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', password: '', role: '' });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
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
      await axios.delete(`http://localhost:3001/users/${id}`);
      fetchUsers(); // Refresh list
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setForm({
      username: user.username,
      email: user.email || user.Email, // handle inconsistent JSON
      password: user.password,
      role: user.role
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/users/${editingUser}`, form);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Username</th><th>Email</th><th>Password</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email || user.Email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <form onSubmit={handleUpdate}>
          <h3>Edit User</h3>
          <input type="text" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required />
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input type="text" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ManageUsers;
