import React from 'react';
import { BackButton, HeaderContainer, LogoutButton } from './styles';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); //
    window.location.href = '/';
  };
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== '/home';
  return (
    <div>
    <HeaderContainer>
      <h1>Gestión de Asistencia</h1>
      <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
    </HeaderContainer>
    {showBackButton && (
        <BackButton onClick={() => navigate(-1)}>←</BackButton> 
      )}
    </div>
  );
};

export default Header;
