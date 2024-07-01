import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import VerifyEmail from './components/VerifyEmail';
import EditProfile from './components/EditProfile';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* PrivateRoute is used to protect routes that require authentication */}
          <Route path='/' element={<PrivateRoute><VerifyEmail /></PrivateRoute>}></Route>
          <Route path='/login' element={<PrivateRoute><Login /></PrivateRoute>}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path="/forgot-password" element={<PrivateRoute><ForgotPassword /></PrivateRoute>}></Route>
          <Route path="/reset-password/:id/:token" element={<PrivateRoute><ResetPassword /></PrivateRoute>}></Route>
          {/* This route expects a dynamic email parameter for email verification */}
          <Route path="/verifyemail/:email" element={<PrivateRoute><Signup /></PrivateRoute>}></Route>
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
