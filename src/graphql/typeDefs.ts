import { gql } from "graphql-request";

const typeDefs = gql`
  scalar Date

  type Restaurant {
    id: ID!
    name: String!
    address: String!
    description: String!
    table: [Table!]!
  }

  type Table {
    id: ID!
    restaurantId: String!
    capacity: Int
    description: String
  }

  type Reservation {
    id: ID!
    restaurantId: String,
    tables: [Table],
    numberOfPersons: Int,
    reservationFrom: Date
    reservationTo: Date
  }

  input RestaurantInput {
    id: ID!
    name: String!
    address: String!
    table: [Table!]!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    restaurants: [Restaurant]
    getRestaurantById(id: String): Restaurant
  }

  type Mutation {
    updateRestaurant(input: RestaurantInput): Restaurant!
  }
`;
export default typeDefs;