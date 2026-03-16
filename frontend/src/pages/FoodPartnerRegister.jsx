import React from 'react'
import { Link, useAsyncError } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerRegister = () => {
    const handleSubmit = async(e) => {
        e.preventDefault();
        const businessName = e.target.businessName.value;
        const email = e.target.email.value;
        const password = e.target.password.value

        try{
            const response =  await axios.post("http://localhost:3000/api/auth/foodPartner/register", {
                name: businessName,
                email,
                password
            }, {
                withCredentials: true
            });
            console.log('register success', response.data);  
            navigate("/create_food");   
        }catch(error){
            console.error('register error', error?.response?.data || error);
            alert(error?.response?.data?.message || 'Registration failed');
        }
        
    } 
    
     

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Food Partner Register</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Business name
            <input
              className="auth-input"
              type="text"
              name="businessName"
              placeholder="e.g. Sunrise Kitchen"
              required
            />
          </label>

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
          <Link to="/food_partner/login" className="auth-link">
            Log in as partner
          </Link>{' '}
          or{' '}
          <Link to="/user/login" className="auth-link">
            Log in as user
          </Link>
        </p>
      </div>
    </div>
  )
}

export default FoodPartnerRegister //Asgg
