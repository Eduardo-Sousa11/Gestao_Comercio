import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Home from './pages/Home/dashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Home />} />
    </Routes>
  );
}

export default App;
