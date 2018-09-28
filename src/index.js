import { ApolloServer, gql } from 'apollo-server';
import dbClient from './db/dbClient';
import SonarQube from './db/SonarQube'

// The GraphQL schema
const typeDefs = gql`
  type SonarQubeStat {
    project: String,
    bugs_amount: Int,
  }
  type Query {
    "A simple type for getting started!"
    hello: String,
    sonarQubeStats: [SonarQubeStat],
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: async () => {
      const res = await dbClient.query('SELECT $1::text as message', ['Hello world!']);
      return res.rows[0].message;
    },
    sonarQubeStats: async (projectName) => {
      return await SonarQube.getStatsForProject('spr');
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
