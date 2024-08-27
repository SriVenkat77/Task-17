import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: '',
    username: '',
    email: '',
    address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
    phone: '',
    website: '',
    company: { name: '', catchPhrase: '', bs: '' }
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    setUsers(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const keys = name.split('.');
      setCurrentUser((prevUser) => {
        let newUser = { ...prevUser };
        let temp = newUser;

        for (let i = 0; i < keys.length - 1; i++) {
          temp = temp[keys[i]];
        }
        
        temp[keys[keys.length - 1]] = value;
        return newUser;
      });
    } else {
      setCurrentUser({ ...currentUser, [name]: value });
    }
  };

  const addUser = async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', currentUser);
    setUsers([...users, response.data]);
    resetForm();
  };

  const editUser = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = async () => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${currentUser.id}`, currentUser);
    setUsers(users.map(user => (user.id === currentUser.id ? response.data : user)));
    resetForm();
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

  const resetForm = () => {
    setEditing(false);
    setCurrentUser({
      id: null,
      name: '',
      username: '',
      email: '',
      address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
      phone: '',
      website: '',
      company: { name: '', catchPhrase: '', bs: '' }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>User List</h2>
        <table className="table table-bordered table-responsive ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{`${user.company.name} - ${user.company.catchPhrase}`}</td>
                <td>
                  <button className="btn btn-primary mr-2" onClick={() => editUser(user)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="mt-4">{editing ? 'Edit User' : 'Add New User'}</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={currentUser.name}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="username"
              className="form-control mt-2"
              placeholder="Username"
              value={currentUser.username}
              onChange={handleInputChange}
            />

            <input
              type="email"
              name="email"
              className="form-control mt-2"
              placeholder="Email"
              value={currentUser.email}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="phone"
              className="form-control mt-2"
              placeholder="Phone"
              value={currentUser.phone}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="website"
              className="form-control mt-2"
              placeholder="Website"
              value={currentUser.website}
              onChange={handleInputChange}
            />
            
            <input
              type="text"
              name="address.street"
              className="form-control mt-2"
              placeholder="Street"
              value={currentUser.address.street}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="address.suite"
              className="form-control mt-2"
              placeholder="Suite"
              value={currentUser.address.suite}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="address.city"
              className="form-control mt-2"
              placeholder="City"
              value={currentUser.address.city}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="address.zipcode"
              className="form-control mt-2"
              placeholder="Zipcode"
              value={currentUser.address.zipcode}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="address.geo.lat"
              className="form-control mt-2"
              placeholder="Latitude"
              value={currentUser.address.geo.lat}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="address.geo.lng"
              className="form-control mt-2"
              placeholder="Longitude"
              value={currentUser.address.geo.lng}
              onChange={handleInputChange}
            />

            <h6>Company </h6>
            <input
              type="text"
              name="company.name"
              className="form-control mt-2"
              placeholder="Company Name"
              value={currentUser.company.name}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="company.catchPhrase"
              className="form-control mt-2"
              placeholder="Catch Phrase"
              value={currentUser.company.catchPhrase}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="company.bs"
              className="form-control mt-2"
              placeholder="Business Service"
              value={currentUser.company.bs}
              onChange={handleInputChange}
            />
          </div>

          {editing ? (
            <>
              <button type="button" className="btn btn-success mt-3" onClick={updateUser}>Save</button>
              <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={resetForm}>Cancel</button>

            </>
          ) : (
            <button type="button" className="btn btn-success mt-3" onClick={addUser}>Add User</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
