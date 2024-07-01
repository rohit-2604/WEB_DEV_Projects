import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    const verifyToken = token ? JSON.parse(atob(token.split('.')[1])) : null;

    if (!token) {
      navigate('/login');
    } else {
      setUsername(verifyToken.name);
      setEmail(verifyToken.email);
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('image', image);
    formData.append('email', email); // Include email in the form data

    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Profile updated successfully');

        // Logout user and redirect to login page after profile update
        await fetch('http://localhost:5000/api/logout', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Clear cookie on client side
        Cookies.remove('token');

        // Redirect to login page after logout
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect to login after 2 seconds
      } else {
        setMessage(data.message || 'Error updating profile');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  return (
    <div className="container mt-5  ">
      <div className="card mx-auto bgcustom0 shadow" style={{ maxWidth: "400px" }}>
        <div className="card-header bgcustom1 shadow align-items-center">
          <h2 className="card-title text-center mb-0">Edit Profile</h2>
        </div>
        <div className="card-body">
          {message && <p className="alert alert-info">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Profile Picture</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="btn btn-success mt-3 ">Update Profile </button>
            <a href="/"><button type="button" className="btn btn-success mt-3 btcustom1">Go Back to Dashboard</button></a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
