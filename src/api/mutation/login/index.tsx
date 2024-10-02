import { gql } from '@apollo/client';
import client from '../../../apollo/apollo';

const LOGIN_MUTATION = gql`
  mutation {
    login(rut: $rut, password: $password) {
      message
      token
    }
  }
`;
export const loginUser = async (rut: string, password: string) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        rut,
        password,
      },
    });

    return data.login; 
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
