import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const FoodPartnerLogin = () => {

  const handleLogin = async (e) => { 
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;   

     try{
            const response =  await axios.post("http://localhost:3000/api/auth/foodPartner/login", {
                
                email,
                password
            }, {
                withCredentials: true
            });
            console.log('login success', response.data); 
            navigate("/create_food");    
        }catch(error){
            console.error('register error', error?.response?.data || error);
            alert(error?.response?.data?.message || 'login failed');
        }
    }

    

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Food Partner Login</h1>

        <form className="auth-form" onSubmit={handleLogin}>
          <label className="auth-label">
            Email
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="partner@example.com"
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
          Need an account?{' '}
          <Link to="/food_partner/register" className="auth-link">
            Register as partner
          </Link>{' '}
          or{' '}
          <Link to="/user/register" className="auth-link">
            Register as user
          </Link>
        </p>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
