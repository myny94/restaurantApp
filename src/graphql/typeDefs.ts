import { gql } from 'graphql-request'

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
  }

  type Reservation {
    id: ID!
    restaurantId: String
    tables: [Table]
    numberOfPersons: Int
    reservationFrom: Date
    reservationTo: Date
  }

  input RestaurantInput {
    name: String!
    address: String!
    description: String!
    table: [TableInput!]!
  }

  input ReservationInput {
    restaurantId: String
    tables: [TableInput!]!
    numberOfPersons: Int
    reservationFrom: Date
    reservationTo: Date
  }

  input TableInput {
    restaurantId: String!
    capacity: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    restaurants: [Restaurant]
    reservations: [Reservation]
    tables: [Table]
    getRestaurantById(id: String): Restaurant
    getReservationById(id: String): Reservation
    searchRestaurants(searchTerm: String): [Restaurant]
    getTables(restaurantId: String): [Table]
  }

  type Mutation {
    updateRestaurant(updatedRestaurant: RestaurantInput!): Restaurant!
    addNewRestaurant(input: RestaurantInput): Restaurant!
    deleteRestaurant(id: String!): Restaurant!
    updateReservation(
      id: String!
      updatedReservation: ReservationInput!
    ): Reservation!
    addNewReservation(input: ReservationInput): Reservation!
    deleteReservation(id: String!): Reservation!
  }
`
export default typeDefs
