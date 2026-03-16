import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/general/Home'
import UserLogin from '../pages/UserLogin'
import UserRegister from '../pages/UserRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import CreateFood from '../pages/general/CreateFood'

export const AppRoutes = () => {
     
    


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food_partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food_partner/login" element={<FoodPartnerLogin />} />
        <Route path="/create_food" element={<CreateFood />} />
        <Route path="*" element={<Navigate to="/user/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
