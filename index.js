// Importing the ApolloServer class from apollo-server
const { ApolloServer } = require("apollo-server");

// Importing the importSchema function from graphql-import
const { importSchema } = require("graphql-import");

// Importing the EtherDataSource class from the ethDatasource file
const EtherDataSource = require("./datasource/ethDatasource");

// Importing the GraphQL schema from the schema.graphql file
const typeDefs = importSchema("./schema.graphql");

// Loading environment variables from .env file
require("dotenv").config();

// Defining the resolvers for the GraphQL queries
const resolvers = {
  Query: {
    // Resolver to get ether balance for an address
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver to get total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver to get latest ETH price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver to get average block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Creating an instance of ApolloServer
const server = new ApolloServer({
  typeDefs, // The GraphQL schema
  resolvers, // The resolvers for the GraphQL queries
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // The data source for Ethereum data
  }),
});

server.timeout = 0; // Setting the server timeout to 0

// Starting the server on port 9000
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
