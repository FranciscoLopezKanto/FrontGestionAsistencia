import { useState } from 'react';
import Modal from '../../components/modal'; 
import {  CourseCard, CourseListContainer, HeaderStyle } from './styles/index';
import { Oval } from 'react-loader-spinner';
import { Overlay,SubmitContainer } from '../listAlumnos/styles';

const initialCourses = [
  { id: 1, nombreCurso: 'Arquitectura de Sistemas', Semestre: 'VI' },
  { id: 2, nombreCurso: 'Administración de Sistemas', Semestre: 'VII' },
  { id: 3, nombreCurso: 'Diseño de Sistemas', Semestre: 'VIII' },
  { id: 4, nombreCurso: 'Programación Orientada a Objetos', Semestre: 'IX' },
  {id : 5, nombreCurso: 'Programación Web', Semestre: 'X'},
];

const CourseList = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ nombreCurso: '', Semestre: '' });
  const [isLoading, setIsLoading] = useState(false);

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
          <div>
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
              <input
                type="text"
                value={newCourse.Semestre}
                onChange={(e) => setNewCourse({ ...newCourse, Semestre: e.target.value })}
              />
            </div>
            <button onClick={handleAddCourse}>Guardar Curso</button>
          </div>
        }
      />
    </HeaderStyle>
  );
};

export default CourseList;
