import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #007bff; 
  color: white; 
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 15px; 
  margin-bottom: 0px;

  h1 {
    font-size: 14px;
    margin: 0;
  }

`;

export const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px ;
  border-radius: 10px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333; 
  }
`;
