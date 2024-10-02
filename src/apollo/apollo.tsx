import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://alan-authentic-lawn-ut.trycloudflare.com/graphql', 
  cache: new InMemoryCache(),
});

export default client;
