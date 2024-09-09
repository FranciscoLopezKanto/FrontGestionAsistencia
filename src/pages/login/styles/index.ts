import styled from 'styled-components';

export const LoginContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;  /* Centrado vertical */
  align-items: center;      /* Centrado horizontal */
  height: 100vh;            /* Ocupa toda la altura del viewport */
  width: 100vw;             /* Opcional: ocupar todo el ancho */
`;

export const FormStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  h2 {
    font-size: 14px;
    text-align: left;  /* Ajustado a la izquierda */
  }
`;

export const InputStyled = styled.div`
  gap: 15px; /* Ajusté el valor ya que "1500px" era un valor inusualmente grande */

  h2 {
    font-size: 24px; /* Ajusté el tamaño del texto ya que "104px" era bastante grande */
  }
`;
