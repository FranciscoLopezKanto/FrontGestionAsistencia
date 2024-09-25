import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormStyled, InputStyled, LoginContainer, LoginContainerStyled } from './styles';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === 'user' && password === 'password') {
      console.log('Login correcto');
      navigate('/home');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <LoginContainer>
      <LoginContainerStyled>
        <h1>Inicia sesión para Gestionar tus citas</h1>
        <FormStyled onSubmit={handleLogin}>
          <InputStyled>
            <h2>Nombre de usuario</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputStyled>
          <InputStyled>
            <h2>Contraseña</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputStyled>
          <button type="submit">Login</button>
        </FormStyled>
      </LoginContainerStyled>
    </LoginContainer>
  );
};

export default Login;
