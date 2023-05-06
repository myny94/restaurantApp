import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  scalar Date

  type Restaurant {
    id: String
    name: String
    address: String
    table: [Table]
  }

  type Table {
    id: String
    restaurantId: String
    capacity: Int
    description: String
  }

  type Booking {
    restaurant: String,
    tables: [Table],
    noOfPersons: Int,
    bookingFrom: Date
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    restaurants: [Restaurant]
  }
`;

const restaurants = [
  {
    id: "id1",
    name: "restaurant 1",
    address: "street 1",
    table: 
    [
      {
        id: "table1",
        restaurantId: "id1",
        capacity: 4,
        description: "normal table",
      },
      {
        id: "table2",
        restaurantId: "id1",
        capacity: 6,
        description: "VIP table",
      },
    ],
  },
  {
    id: "id2",
    name: "restaurant 2",
    address: "street 2",
    table: [{
      id: "table1",
      restaurantId: "id2",
      capacity: 4,
      description: "normal table",
    }],
  },
];

const resolvers = {
  Query: {
    restaurants: () => restaurants,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
