import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    const verifyToken = token ? JSON.parse(atob(token.split('.')[1])) : null;

    if (!token) {
      navigate('/login');
    } else {
      setUser(verifyToken);
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('token');
    alert("Logout Successful")
    navigate('/login');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleDeleteAccount = async () => {
    try {
      const token = Cookies.get('token');
      const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
      const userEmail = decodedToken.email; // Extract email from decoded token

      const response = await fetch(`http://localhost:5000/api/delete-account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        // change to json 
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        // Account deletion successful
        alert("Account Deleted Successfully")
        Cookies.remove('token');
        navigate('/login');
      } else {
        // Handle error response
        console.error('Failed to delete account');
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="container mt-5 ">
      <div className="card mx-auto bgcustom0 shadow" style={{ maxWidth: "400px" }}>
        <div className="card-header bgcustom1 shadow">
          <h2 className="card-title text-center mb-0">Welcome, {user && user.name}</h2>
        </div>
        <div className="card-body text-center">
          {user && (
            <>
              <img
                src={user.photo ? `http://localhost:5000/${user.photo}` : '/default-profile.png'}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover', border: '4px solid #fff' }}
              />
              <p className="card-text mb-4">Welcome back! You're logged in.</p>
              <div>
                <button className="btn btn-danger btn-block" onClick={handleLogout}>Logout</button>
              </div>
              <div>
                <button className="btn btn-primary btn-block mt-3" onClick={handleEditProfile}>Edit Profile</button>
              </div>
              <div>
                <button className="btn btn-warning btn-block mt-3" onClick={handleDeleteAccount}>Delete Account</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
