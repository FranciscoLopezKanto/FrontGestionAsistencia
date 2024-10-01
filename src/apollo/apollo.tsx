// apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://confusion-casio-plastics-searched.trycloudflare.com/graphql', // Tu endpoint GraphQL
  cache: new InMemoryCache(),
});

export default client;
