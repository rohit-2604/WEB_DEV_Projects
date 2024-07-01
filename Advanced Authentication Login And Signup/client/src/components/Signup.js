import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Signup() {
    const { email: emailFromParams } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [err, setErr] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('verifiedEmail');
        if (emailFromParams === storedEmail) {
            setEmail(storedEmail);
        } else {
            setErr('The email from the URL does not match the verified email.');
            // Optionally: Redirect the user or take some other action
            // navigate('/error');
        }
    }, [emailFromParams, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        if (image) {
            formData.append('image', image);
        }

            axios.post('http://localhost:5000/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        .then(res => {
            console.log(res);
            navigate('/login');
        })
        .catch(error => {
            if (error.response && error.response.data) {
                setErr(error.response.data.error);
            }
        });
    };

    return (
        <div className='vh-100 d-flex justify-content-center align-items-center bgcustom'>
            <div className="w-50 bgcustom0 rounded p-4 shadow">
                <h2 className="text-center mb-4 bgcustom0">Sign Up</h2>
                {err && <p className="text-danger text-center">{err}</p>}
                <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
                    <label className='title-bar-text'>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control mb-3" required />

                    <label className='title-bar-text'>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control mb-3"
                        readOnly={!!email}
                        required
                    />

                    <label className='title-bar-text'>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3" required />

                    <label className='title-bar-text'>Profile Picture</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control mb-3" />

                    <button type='submit' className='btn btn-primary btn-block mt-4 shadow'>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
