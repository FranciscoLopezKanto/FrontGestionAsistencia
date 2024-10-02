import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormStyled, InputStyled, LoginContainer, LoginContainerStyled } from './styles';
import { loginUser } from '../../api/mutation/login';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login:', username, password);
    try {
      const loginResponse = await loginUser(username, password);
      
      if (loginResponse && loginResponse.token) {
        console.log('Login correcto');
        navigate('/home');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      alert('Ocurrió un error durante el inicio de sesión.');
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
