import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../styles.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log('Cadastro:', name, email, password);
    alert(`Conta criada para: ${name}`);
    navigate('/login');
  };

  const passwordStrength = (pass) => {
    if (!pass) return '';
    if (pass.length < 6) return 'Fraca';
    if (pass.match(/[A-Z]/) && pass.match(/[0-9]/) && pass.length >= 8) return 'Forte';
    return 'Média';
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-icon">📝</div>
        <h1>Crie sua conta</h1>
        <p>Preencha os campos para se cadastrar</p>
        <div className="login-form-container">
          <h2>Cadastro</h2>
          <p>Digite suas informações para criar sua conta</p>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
              />
              <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {password && (
              <p className={`password-strength ${passwordStrength(password).toLowerCase()}`}>
                Força da senha: {passwordStrength(password)}
              </p>
            )}

            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme a senha"
              required
            />

            <button type="submit">Cadastrar →</button>
          </form>

          <p className="register-link">
            Já tem uma conta? <span onClick={() => navigate('/login')}>Entre aqui</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
