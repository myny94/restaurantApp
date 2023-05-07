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
    getRestaurantById(id: String): Restaurant
  }
`;
export default typeDefs; 
//export this Schema so we can use it in our project