// api/query/listAsignatura.js
import { gql } from '@apollo/client';
import client from '../../../apollo/apollo';

const FETCH_SUBJECTS = gql`
  query {
    listSubject {
      id
      name
      numberOfClasses
    }
  }
`;

const fetchSubjects = async () => {
  try {
    const { data } = await client.query({
      query: FETCH_SUBJECTS,
    });
    return data.subjects; // Retorna las asignaturas
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export default fetchSubjects;
