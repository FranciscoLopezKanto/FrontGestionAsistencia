import styled from 'styled-components';

export const CourseListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px 120px;
  gap: 46px; 
  margin: 20px 0;
  justify-content: center;
`;
export const HeaderStyle = styled.div`
  h1 {
    font-size: 24px;
    margin: 0;
    padding: 14px;
    margin-left: 10px;
  }
`;
export const CourseCard = styled.div`
  background-color: #f8f9fa; 
  border: 1px solid #ced4da;
  border-radius: 10px; 
  padding: 20px;
  width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer; 
  transition: background-color 0.3s ease; 
  p {
    font-size: 12px;
  }
  h3 {
    font-size: 16px;
  }
  &:hover {
    background-color: #e9ecef; // Change background color on hover
  }
`;
