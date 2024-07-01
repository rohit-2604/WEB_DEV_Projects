import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


function ForgotPassword() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/forgot-password', {email})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/login')
               
            }
        }).catch(err => console.log(err))
    }

    return(
        <div className="d-flex justify-content-center align-items-center  vh-100 bgcustom">
      <div className=" bgcustom0 p-3 rounded w-25 shadow">
        <h4 className="bgcustom0">Forgot Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className="form-control "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100  btcustom shadow">
            Send
          </button>
          </form>
        
      </div>
    </div>
    )
}

export default ForgotPassword;