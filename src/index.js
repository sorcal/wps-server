import { ApolloServer, gql } from 'apollo-server';
import dbClient from './dbClient';

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: async () => {
      const res = await dbClient.query('SELECT $1::text as message', ['Hello world!']);
      return res.rows[0].message;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
