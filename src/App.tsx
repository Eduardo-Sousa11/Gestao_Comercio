import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Dashboard'
import Companies from './pages/Companies/CompaniesList'
import Clients from './pages/Clients/ClientsList'
import OrderLaunch from './pages/OrderLaunch/OrderLaunchList'
import Orders from './pages/Orders/OrdersList'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/orderslaunch" element={<OrderLaunch />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
