import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal';
import { useState } from 'react';
import { ActionButton, HomeContainer, Overlay, StudentDetails, SubmitContainer, Table } from './styles';
import { Oval } from 'react-loader-spinner';

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
  const [selectedStudent, setSelectedStudent] = useState<typeof initialAlumnos[0] | null>(null);
  const [allPresent, setAllPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para el spinner de carga

  const handleView = (id: number) => {
    const alumno = alumnos.find(a => a.id === id);
    if (alumno) {
      setSelectedStudent(alumno);
      setIsModalOpen(true);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/alumnos/${id}/editar`);
  };

  const handleAttendanceToggle = (id: number) => {
    setAlumnos(prevAlumnos =>
      prevAlumnos.map(alumno =>
        alumno.id === id
          ? { ...alumno, presenteHoy: !alumno.presenteHoy }
          : alumno
      )
    );
  };

  const handleAllPresentToggle = () => {
    setAlumnos(prevAlumnos =>
      prevAlumnos.map(alumno => ({
        ...alumno,
        presenteHoy: !allPresent,
      }))
    );
    setAllPresent(prevState => !prevState);
  };

  const handleSaveAttendance = () => {
    setIsLoading(true); // Inicia el proceso de carga (spinner)
    
    setTimeout(() => {
      setAlumnos(prevAlumnos =>
        prevAlumnos.map(alumno =>
          alumno.presenteHoy
            ? {
                ...alumno,
                diasAsistidos: alumno.diasAsistidos + 1,
                diasTotales: alumno.diasTotales + 1,
                presenteHoy: false,
              }
            : {
                ...alumno,
                diasTotales: alumno.diasTotales + 1,
              }
        )
      );
      setIsLoading(false); // Finaliza el proceso de carga
    }, 2000); // Simula un proceso de subida de datos con retraso
  };

  return (
    <HomeContainer>
      <h1>Lista de Alumnos</h1>
      <Table>
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>
              Asistencia
              <input
                type="checkbox"
                onChange={handleAllPresentToggle}
                checked={allPresent}
              />
            </th>
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
                  checked={alumno.presenteHoy}
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

      <SubmitContainer>
        <button onClick={handleSaveAttendance}>Subir</button>
      </SubmitContainer>

      {isLoading && (
        <Overlay>
          <Oval
            visible={true}
            height={80}
            width={80}
            color="#4fa94d"
            ariaLabel="oval-loading"
          />
        </Overlay>
      )}

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
            <Oval
              visible={true}
              height={80}
              width={80}
              color="#4fa94d"
              ariaLabel="oval-loading"
            />
          )
        }
      />
    </HomeContainer>
  );
};

export default Home;
