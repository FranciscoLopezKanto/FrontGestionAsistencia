import { useEffect, useState } from 'react';
import Modal from '../../components/modal'; 
import { CourseCard, CourseListContainer, HeaderStyle } from './styles/index';
import { Oval } from 'react-loader-spinner';
import { Overlay, StudentDetails, SubmitContainer } from '../listAlumnos/styles';
import { initialCourses, semestresOptions } from './consts';
import { useNavigate } from 'react-router-dom';
import { fetchSubjects } from '../../api/query/cursos/index';

const CourseList = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ nombreCurso: '', Semestre: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getSubjects = async () => {
      setIsLoading(true); // Inicia el loading
      try {
        const data = await fetchSubjects(); 
        console.log(data); // Puedes ver los datos en la consola
        setSubjects(data); 
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setIsLoading(false); // Finaliza el loading
      }
    };

    getSubjects();
  }, []);
  console.log(subjects);
  const handleAddCourse = () => {
    if (newCourse.nombreCurso && newCourse.Semestre) {
      setIsLoading(true);
      setTimeout(() => {
        setCourses(prevCourses => [
          ...prevCourses,
          { ...newCourse, id: prevCourses.length + 1, alumnos: [] },
        ]);
        setNewCourse({ nombreCurso: '', Semestre: '' });
        setIsModalOpen(false);
        setIsLoading(false);
      }, 2000);
    } else {
      alert('Por favor, completa todos los campos necesarios.');
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
        {courses.map(course => (
          <CourseCard key={course.id} onClick={() => handleCourseClick(course.id)}>
            <h3>{course.nombreCurso}</h3>
            <p>Semestre: {course.Semestre}</p>
          </CourseCard>
        ))}
      </CourseListContainer>
      <SubmitContainer>
        <button onClick={() => setIsModalOpen(true)}>Agregar Curso +</button>
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
            <h2>Agregar Curso</h2>
            <div>
              <label>Nombre del Curso:</label>
              <input
                type="text"
                value={newCourse.nombreCurso}
                onChange={(e) => setNewCourse({ ...newCourse, nombreCurso: e.target.value })}
              />
            </div>
            <div>
              <label>Semestre:</label>
              <select
                value={newCourse.Semestre}
                onChange={(e) => setNewCourse({ ...newCourse, Semestre: e.target.value })}
              >
                <option value="">Selecciona un semestre</option>
                {semestresOptions.map(semestre => (
                  <option key={semestre} value={semestre}>
                    {semestre}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleAddCourse}>Guardar Curso</button>
          </StudentDetails>
        }
      />
    </HeaderStyle>
  );
};

export default CourseList;
