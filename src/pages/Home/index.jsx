import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Apenas log por enquanto
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', email, password);
    navigate('/home');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem uma conta?{' '}
        <span className="register-link" onClick={() => navigate('/register')}>
          Registrar
        </span>
      </p>
    </div>
  );
}

export default Login;
