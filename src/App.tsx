// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Dashboard";

function App() {
  return (
    <Routes>
      {/* Redireciona a raiz para /login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
