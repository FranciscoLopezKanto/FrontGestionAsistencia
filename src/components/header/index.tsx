import React from 'react';
import { HeaderContainer, LogoutButton } from './styles';

const Header: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); //
    window.location.href = '/';
  };

  return (
    <HeaderContainer>
      <h1>Gestión de Asistencia</h1>
      <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
    </HeaderContainer>
  );
};

export default Header;
