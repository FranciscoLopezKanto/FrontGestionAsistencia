import { useEffect, useState } from 'react';
import Modal from '../../components/modal'; 
import { CourseCard, CourseListContainer, HeaderStyle } from './styles/index';
import { Oval } from 'react-loader-spinner';
import { Overlay, StudentDetails, SubmitContainer } from '../listAlumnos/styles';
import { initialCourses } from './consts';
import { useNavigate } from 'react-router-dom';
import { fetchSubjects } from '../../api/query/cursos/index';

const CourseList = () => {
  const [, setCourses] = useState<{ id: number; nombreCurso: string; Semestre: string; }[]>(initialCourses);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ nombreAsignatura: '', numeroClases: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSubjects = async () => {
      setIsLoading(true); // Inicia el loading
      try {
        const data = await fetchSubjects(); 
        console.log(data); 

        if (data.length === 0) {
          setSubjects([{ id: 1, name: 'Example', numberOfClasses: 0 }]);
        } else {
          setSubjects(data); 
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setSubjects([{ id: 1, name: 'Example', numberOfClasses: 0 }]);
      } finally {
        setIsLoading(false); 
      }
    };

    getSubjects();
  }, []);

  console.log(subjects);

  const handleAddCourse = () => {
    const numeroClasesFloat = parseFloat(newCourse.numeroClases);
    if (newCourse.nombreAsignatura && !isNaN(numeroClasesFloat)) {
      setIsLoading(true);
      setTimeout(() => {
        setCourses(prevCourses => [
          ...prevCourses,
          { id: prevCourses.length + 1, nombreCurso: newCourse.nombreAsignatura, Semestre: '', numberOfClasses: numeroClasesFloat },
        ]);
        setNewCourse({ nombreAsignatura: '', numeroClases: '' });
        setIsModalOpen(false);
        setIsLoading(false);
      }, 2000);
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  };

  const handleCourseClick = (courseId: number) => {
    console.log(`Navigating to students of course ID: ${courseId}`);
    navigate(`/home/${courseId}/alumnos`);
  };

  return (
    <HeaderStyle>
      <h1>Lista de Cursos</h1>
      <CourseListContainer>
        {subjects.map(subject => (
          <CourseCard key={subject.id} onClick={() => handleCourseClick(subject.id)}>
            <h3>{subject.name}</h3>
            <p>Numero de clases: {subject.numberOfClasses}</p>
          </CourseCard>
        ))}
      </CourseListContainer>
      <SubmitContainer>
        <button onClick={() => setIsModalOpen(true)}>Agregar Asignatura +</button>
      </SubmitContainer>

      {isLoading && (
        <Overlay>
          <Oval visible={true} height={80} width={80} color="#4fa94d" ariaLabel="oval-loading" />
        </Overlay>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        text={
          <StudentDetails>
            <h2>Agregar Asignatura</h2>
            <div>
              <label>Nombre de la Asignatura:</label>
              <input
                type="text"
                value={newCourse.nombreAsignatura}
                onChange={(e) => setNewCourse({ ...newCourse, nombreAsignatura: e.target.value })}
              />
            </div>
            <div>
              <label>Número de Clases:</label>
              <input
                type="text"
                value={newCourse.numeroClases}
                onChange={(e) => setNewCourse({ ...newCourse, numeroClases: e.target.value })}
              />
            </div>
            <button onClick={handleAddCourse}>Guardar Asignatura</button>
          </StudentDetails>
        }
      />
    </HeaderStyle>
  );
};

export default CourseList;
