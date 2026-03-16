import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", {
                name: firstName,
                email,
                password
            }, {
                withCredentials: true
            });

            console.log('register success', response.data);

            // Navigate only after a successful registration
            navigate("/");
        } catch (error) {
            console.error('register error', error?.response?.data || error);
            alert(error?.response?.data?.message || 'Registration failed');
        }
    }
   


  return (
   

    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">User Register</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Full name
            <input
              className="auth-input"
              type="text"
              name="name"
              placeholder="Jane Doe"
              required
            />
          </label>

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

          <label className="auth-label">
            Confirm password
            <input
              className="auth-input"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              required
            />
          </label>

          <button className="auth-button" type="submit">
            Create account
          </button>
        </form>

        <p className="auth-caption">
          Already have an account?{' '}
          <Link to="/user/login" className="auth-link">
            Log in as user
          </Link>{' '}
          or{' '}
          <Link to="/food_partner/login" className="auth-link">
            Log in as partner
          </Link>
        </p>
      </div>
    </div>
  )
}

export default UserRegister
