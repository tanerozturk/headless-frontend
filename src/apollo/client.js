import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://headlesswp.loc/graphql',
  cache: new InMemoryCache(),
});

export default client;
