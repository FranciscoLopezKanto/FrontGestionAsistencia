import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;  
  align-items: center;     
  height: 100vh;            
  width: 100vw;             
  
`;

export const LoginContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;  
  align-items: center;      
  height: 600px;            
  width: 800px;           
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  h1 {
    text-align: center;
    font-size: 24px;
  }
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InputStyled = styled.div`
  h2 {
    text-align: left;
    font-size: 16px; 
  }
  input {	
    width: 300px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
  }
`;
