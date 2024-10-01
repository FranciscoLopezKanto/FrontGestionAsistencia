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

export const fetchSubjects = async () => {
  try {
    const { data } = await client.query({
      query: FETCH_SUBJECTS,
    });
    return data.listSubject;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error; 
  }
};
