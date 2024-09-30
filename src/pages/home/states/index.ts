// useStudentStates.ts
import { useState } from 'react';
import { initialAlumnos } from '../consts/index';

const useStudentStates = () => {
  const [alumnos, setAlumnos] = useState(initialAlumnos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [allPresent, setAllPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newStudent, setNewStudent] = useState({
    nombreCompleto: '',
    edad: '',
    estado: 'Activo', 
    genero: 'Masculino', 
    diasAsistidos: 0,
    diasTotales: 0,
    promedio: 0,
  });

  const resetNewStudent = () => {
    setNewStudent({
      nombreCompleto: '',
      edad: '',
      estado: 'Activo',
      genero: 'Masculino',
      diasAsistidos: 0,
      diasTotales: 0,
      promedio: 0,
    });
  };

  return {
    alumnos,
    setAlumnos,
    isModalOpen,
    setIsModalOpen,
    isEditMode,
    setIsEditMode,
    selectedStudent,
    setSelectedStudent,
    allPresent,
    setAllPresent,
    isLoading,
    setIsLoading,
    newStudent,
    setNewStudent,
    resetNewStudent,
  };
};

export default useStudentStates;
