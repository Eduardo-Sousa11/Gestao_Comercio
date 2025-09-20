// Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', email, password, remember)
    alert(`Login: ${email}`)
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-icon">🔒</div>
        <h1>Bem-vindo</h1>
        <p>Faça login para continuar</p>
        <div className="login-form-container">
          <h2>Entrar</h2>
          <p>Digite suas credenciais para acessar sua conta</p>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
            {/* <div className="remember-forgot">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Lembrar-me
              </label>
              <span className="forgot-password">Esqueceu a senha?</span>
            </div> */}
            <button type="submit">Entrar</button>
          </form>
          <p className="register-link">
            Não tem uma conta? <span onClick={() => navigate('/register')}>Cadastre-se</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login
