import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../../components/modal';
import { useState, useEffect } from 'react';

// Lista de alumnos con los campos de días asistidos y días totales
const initialAlumnos = [
  { id: 1, nombreCompleto: 'Francisco Lopez', edad: 20, estado: 'Activo', genero: 'Masculino', diasAsistidos: 40, diasTotales: 50, promedio: 5.5, presenteHoy: false },
  { id: 2, nombreCompleto: 'María Luisa Rivera', edad: 21, estado: 'Inactivo', genero: 'Femenino', diasAsistidos: 35, diasTotales: 50, promedio: 4.5, presenteHoy: false },
  { id: 3, nombreCompleto: 'Sylas Ronaldo Gaucho', edad: 22, estado: 'Activo', genero: 'Masculino', diasAsistidos: 45, diasTotales: 50, promedio: 6.5, presenteHoy: false },
  { id: 4, nombreCompleto: 'Cristina Contreras', edad: 23, estado: 'Activo', genero: 'Femenino', diasAsistidos: 42, diasTotales: 50, promedio: 5.0, presenteHoy: false },
  { id: 5, nombreCompleto: 'Javier Figueroa', edad: 24, estado: 'Inactivo', genero: 'Masculino', diasAsistidos: 38, diasTotales: 50, promedio: 3.5, presenteHoy: false },
  { id: 6, nombreCompleto: 'Cristian Larzon', edad: 25, estado: 'Activo', genero: 'Masculino', diasAsistidos: 47, diasTotales: 50, promedio: 7.0, presenteHoy: false },
  { id: 7, nombreCompleto: 'Carlos Figueroa', edad: 26, estado: 'Activo', genero: 'Masculino', diasAsistidos: 40, diasTotales: 50, promedio: 5.5, presenteHoy: false },
  { id: 8, nombreCompleto: 'Carlos Soza', edad: 27, estado: 'Activo', genero: 'Masculino', diasAsistidos: 45, diasTotales: 50, promedio: 6.5, presenteHoy: false },
];

const Home = () => {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState(initialAlumnos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof initialAlumnos[0] | null>(null); // Define the correct type for selectedStudent

  // Maneja la vista de detalles del estudiante seleccionado
  const handleView = (id: number) => {
    const alumno = alumnos.find(a => a.id === id);
    if (alumno) {
      setSelectedStudent(alumno);
      setIsModalOpen(true);
    }
  };

  // Redirige a la página de edición del alumno
  const handleEdit = (id: number) => {
    navigate(`/alumnos/${id}/editar`);
  };

  // Marca o desmarca un estudiante como presente hoy
  const handleAttendanceToggle = (id: number) => {
    setAlumnos(prevAlumnos =>
      prevAlumnos.map(alumno =>
        alumno.id === id
          ? { ...alumno, presenteHoy: !alumno.presenteHoy }
          : alumno
      )
    );
  };

  // Marca todos los estudiantes como presentes
  const handleAllPresent = () => {
    setAlumnos(prevAlumnos =>
      prevAlumnos.map(alumno => ({
        ...alumno,
        presenteHoy: true, // Marcar todos como presentes
      }))
    );
  };

  // Guarda la asistencia (sube los cambios y actualiza los días asistidos y totales)
  const handleSaveAttendance = () => {
    setAlumnos(prevAlumnos =>
      prevAlumnos.map(alumno =>
        alumno.presenteHoy
          ? {
              ...alumno,
              diasAsistidos: alumno.diasAsistidos + 1,
              diasTotales: alumno.diasTotales + 1,
              presenteHoy: false, // Reinicia la asistencia para el siguiente día
            }
          : {
              ...alumno,
              diasTotales: alumno.diasTotales + 1,
            }
      )
    );
  };

  // Calcula el porcentaje de asistencia
  const calculateAttendancePercentage = (diasAsistidos: number, diasTotales: number) => {
    return ((diasAsistidos / diasTotales) * 100).toFixed(2) + '%';
  };

  useEffect(() => {
    setAlumnos(prevAlumnos =>
      prevAlumnos.map(alumno => ({
        ...alumno,
        porcentajeAsistencia: calculateAttendancePercentage(alumno.diasAsistidos, alumno.diasTotales),
      }))
    );
  }, []);

  return (
    <HomeContainer>
      <h1>Lista de Alumnos</h1>
      <button onClick={handleAllPresent}>Marcar Todos Presentes</button>
      <Table>
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Asistencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map(alumno => (
            <tr key={alumno.id}>
              <td>{alumno.nombreCompleto}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleAttendanceToggle(alumno.id)}
                  checked={alumno.presenteHoy} // Refleja el estado de asistencia
                />
                Presente
              </td>
              <td>
                <ActionButton onClick={() => handleView(alumno.id)}>Ver</ActionButton>
                <ActionButton onClick={() => handleEdit(alumno.id)}>Editar</ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button onClick={handleSaveAttendance}>Subir</button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        text={
          selectedStudent ? (
            <StudentDetails>
              <h2>Detalles del Estudiante</h2>
              <p><strong>Nombre Completo:</strong> {selectedStudent.nombreCompleto}</p>
              <p><strong>Edad:</strong> {selectedStudent.edad}</p>
              <p><strong>Estado:</strong> {selectedStudent.estado}</p>
              <p><strong>Género:</strong> {selectedStudent.genero}</p>
              <p><strong>Días Asistidos:</strong> {selectedStudent.diasAsistidos}</p>
              <p><strong>Días Totales:</strong> {selectedStudent.diasTotales}</p>
              <p><strong>Promedio:</strong> {selectedStudent.promedio}</p>
            </StudentDetails>
          ) : (
            'Cargando...'
          )
        }
      />
    </HomeContainer>
  );
};

export default Home;

// Estilos del contenedor principal
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

// Estilos de la tabla
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

// Estilos de los botones de acción
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

// Estilos para los detalles del estudiante en el modal
const StudentDetails = styled.div`
  text-align: left;
  h2 {
    margin-top: 0;
  }
`;
