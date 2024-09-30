import Modal from '../../components/modal';
import { useState, useEffect } from 'react';
import { ActionButton, HomeContainer, Overlay, StudentDetails, SubmitContainer, Table } from './styles';
import { Oval } from 'react-loader-spinner';
import { initialAlumnos } from './consts';

const Home = () => {
  const [alumnos, setAlumnos] = useState(initialAlumnos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof initialAlumnos[0] | null>(null);
  const [allPresent, setAllPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false); // Corregido

  const handleView = (id: number) => {
    const alumno = alumnos.find(a => a.id === id);
    if (alumno) {
      setSelectedStudent(alumno);
      setIsEditMode(false);
      setIsModalOpen(true);
    }
  };

  const handleEdit = (id: number) => {
    const alumno = alumnos.find(a => a.id === id);
    if (alumno) {
      setSelectedStudent(alumno);
      setIsEditMode(true);
      setIsModalOpen(true);
    }
  };

  const handleAttendanceToggle = (id: number) => {
    setAlumnos(prevAlumnos =>
      prevAlumnos.map(alumno =>
        alumno.id === id ? { ...alumno, presenteHoy: !alumno.presenteHoy } : alumno
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

  const [newStudent, setNewStudent] = useState({
    nombreCompleto: '',
    edad: '',
    estado: 'Activo',
    genero: 'Masculino',
    diasAsistidos: 0,
    diasTotales: 0,
    promedio: 0,
    presenteHoy: false,
  });

  const handleAddStudent = () => {
    if (newStudent.nombreCompleto && newStudent.edad) {
      setIsLoading(true);
      setTimeout(() => {
        setAlumnos(prevAlumnos => [
          ...prevAlumnos,
          {
            ...newStudent,
            id: prevAlumnos.length + 1,
            edad: parseInt(newStudent.edad),
          },
        ]);
        setNewStudent({
          nombreCompleto: '',
          edad: '',
          estado: 'Activo',
          genero: 'Masculino',
          diasAsistidos: 0,
          diasTotales: 0,
          promedio: 0,
          presenteHoy: false,
        });
        setIsAddStudentModalOpen(false);
        setIsLoading(false);
      }, 2000);
    } else {
      alert('Por favor, completa todos los campos necesarios.');
    }
  };

  const handleSaveAttendance = () => {
    setIsLoading(true);
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
            : { ...alumno, diasTotales: alumno.diasTotales + 1 }
        )
      );
      setIsLoading(false);
    }, 2000);
  };

  const handleSaveEdit = () => {
    setIsSaving(true);
    setIsModalOpen(false);
    setTimeout(() => {
      if (selectedStudent) {
        setAlumnos(prevAlumnos =>
          prevAlumnos.map(alumno =>
            alumno.id === selectedStudent.id
              ? { ...alumno, promedio: selectedStudent.promedio, estado: selectedStudent.estado }
              : alumno
          )
        );
        setIsSaving(false);
      }
    }, 2000);
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
        <button onClick={handleAddStudent}>Agregar estudiante</button>
      </SubmitContainer>
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
            isEditMode ? (
              <StudentDetails>
                <h2>Editar Alumno</h2>
                <div>
                  <label>Promedio:</label>
                  <input
                    type="number"
                    value={selectedStudent.promedio}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        promedio: parseFloat(e.target.value),
                      })
                    }
                    min={0}
                    max={10}
                    step={0.1}
                  />
                </div>
                <div>
                  <label>Estado:</label>
                  <select
                    value={selectedStudent.estado}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        estado: e.target.value,
                      })
                    }
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <button onClick={handleSaveEdit}>Guardar Cambios</button>
              </StudentDetails>
            ) : (
              <StudentDetails>
                <h2>Detalles del Estudiante</h2>
                <p><strong>Nombre Completo:</strong> {selectedStudent.nombreCompleto}</p>
                <p><strong>Edad:</strong> {selectedStudent.edad}</p>
                <p><strong>Estado:</strong> {selectedStudent.estado}</p>
                <p><strong>Género:</strong> {selectedStudent.genero}</p>
                <p><strong>Porcentaje de Asistencia:</strong> {((selectedStudent.diasAsistidos / selectedStudent.diasTotales) * 100).toFixed(2)}%</p>
                <p><strong>Promedio:</strong> {selectedStudent.promedio}</p>
              </StudentDetails>
            )
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

      {isSaving && (
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
    </HomeContainer>
  );
};

export default Home;
