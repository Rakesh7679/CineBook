import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Home from './features/home/pages/Home'
import './features/auth/style/form.scss'


const AppRoute = () => {
    const hasToken = Boolean(localStorage.getItem('token'))
  return (
    <Routes>
      <Route path="/" element={<Navigate to={hasToken ? '/home' : '/login'} replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}
    


export default AppRoute
