// apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://increasing-bin-exhibition-gis.trycloudflare.com/graphql', 
  cache: new InMemoryCache(),
});

export default client;
