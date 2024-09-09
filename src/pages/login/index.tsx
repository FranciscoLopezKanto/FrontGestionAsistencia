import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FormStyled, InputStyled, LoginContainerStyled} from './styles'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (username === 'user' && password === 'password') {
        navigate('/home');
    } else {
        alert('Credenciales incorrectas');
    }
};

  return (
    <LoginContainerStyled>
      
      <h2>Inicia sesión para Gestionar tus citas</h2>
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
          <h2>Contraseña</h2>
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
  );
};

export default Login;
