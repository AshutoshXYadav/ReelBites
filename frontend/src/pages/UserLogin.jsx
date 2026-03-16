import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
       const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
    try{
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            email,
            password
        }, {
            withCredentials: true
        })
     navigate("/");
    console.log('login success', response.data);
    } catch(error){
        console.error('login error', error?.response?.data || error);
        alert(error?.response?.data?.message || 'Login failed');
    }
}

    
     
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">User Login</h1>

        <form className="auth-form" onSubmit={handleLogin}>
          <label className="auth-label">
            Email
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </label>

          <button className="auth-button" type="submit">
            Log in
          </button>
        </form>

        <p className="auth-caption">
          New here?{' '}
          <Link to="/user/register" className="auth-link">
            Register as user
          </Link>{' '}
          or{' '}
          <Link to="/food_partner/register" className="auth-link">
            Register as partner
          </Link>
        </p>
      </div>
    </div>
  )
}

export default UserLogin
