import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../components/modal';
import { useState } from 'react';

const alumnos = [
  { id: 1, nombreCompleto: 'Francisco Lopez', edad: 20, estado: 'Activo', genero: 'Masculino', porcentajeAsistencia: '80%', promedio: 5.5 },
  { id: 2, nombreCompleto: 'María Luisa Rivera', edad: 21, estado: 'Inactivo', genero: 'Femenino', porcentajeAsistencia: '70%', promedio: 4.5 },
  { id: 3, nombreCompleto: 'Sylas Ronaldo Gaucho', edad: 22, estado: 'Activo', genero: 'Masculino', porcentajeAsistencia: '90%', promedio: 6.5 },
  { id: 4, nombreCompleto: 'Cristina Contreras', edad: 23, estado: 'Activo', genero: 'Femenino', porcentajeAsistencia: '85%', promedio: 5.0 },
  { id: 5, nombreCompleto: 'Javier Figueroa', edad: 24, estado: 'Inactivo', genero: 'Masculino', porcentajeAsistencia: '75%', promedio: 3.5 },
  { id: 6, nombreCompleto: 'Cristian Larzon', edad: 25, estado: 'Activo', genero: 'Masculino', porcentajeAsistencia: '95%', promedio: 7.0 },
  { id: 7, nombreCompleto: 'Carlos Figueroa', edad: 26, estado: 'Activo', genero: 'Masculino', porcentajeAsistencia: '80%', promedio: 5.5 },
  { id: 8, nombreCompleto: 'Carlos Soza', edad: 27, estado: 'Activo', genero: 'Masculino', porcentajeAsistencia: '90%', promedio: 6.5 },
];

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  interface Student {
    id: number;
    nombreCompleto: string;
    edad: number;
    estado: string;
    genero: string;
    porcentajeAsistencia: string;
    promedio: number;
  }
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleView = (id: number) => {
    const alumno = alumnos.find(a => a.id === id);
    if (alumno) {
      setSelectedStudent(alumno);
      setIsModalOpen(true);
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Editar alumno con id ${id}`);
    navigate(`/alumnos/${id}/editar`);
  };

  const handleTicket = (id: number) => {
    console.log(`Generar ticket para alumno con id ${id}`);
  };

  return (
    <HomeContainer>
      <h1>Lista de Alumnos</h1>
      <Table>
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.nombreCompleto}</td>
              <td>
                <ActionButton onClick={() => handleView(alumno.id)}>Ver</ActionButton>
                <ActionButton onClick={() => handleEdit(alumno.id)}>Editar</ActionButton>
                <ActionButton onClick={() => handleTicket(alumno.id)}>Asistencia</ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        text={selectedStudent ? (
          <StudentDetails>
            <h2>Detalles del Estudiante</h2>
            <p><strong>Nombre Completo:</strong> {selectedStudent.nombreCompleto}</p>
            <p><strong>Edad:</strong> {selectedStudent.edad}</p>
            <p><strong>Estado:</strong> {selectedStudent.estado}</p>
            <p><strong>Género:</strong> {selectedStudent.genero}</p>
            <p><strong>Porcentaje de Asistencia:</strong> {selectedStudent.porcentajeAsistencia}</p>
            <p><strong>Promedio:</strong> {selectedStudent.promedio}</p>
          </StudentDetails>
        ) : 'Cargando...'} 
      />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  z-index: 10;
  th, td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
  }
`;

const ActionButton = styled.button`
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

const StudentDetails = styled.div`
  text-align: left; /* Alinear el texto a la izquierda para una mejor legibilidad */
  h2 {
    margin-top: 0;
  }
`;
