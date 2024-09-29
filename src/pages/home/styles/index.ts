import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;


export const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  z-index: 10;
  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
  }
`;

export const ActionButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  button {
    color: white;
  }
`;

export const StudentDetails = styled.div`
  text-align: left;
  h2 {
    margin-top: 0;
  }
`;
