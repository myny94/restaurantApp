import { db } from '../kysely.js'
import { Resolvers } from '../generated/gql-types.js'

const restaurantResolver: Resolvers = {
  Query: {
    restaurants: async () => {
      const restaurants = await db
        .selectFrom('restaurant')
        .selectAll()
        .execute()
      return restaurants.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        description: restaurant.description,
        tables: [],
      }))
    },
    getRestaurantById: async (_: unknown, args) => {
      const restaurant = await db
        .selectFrom('restaurant')
        .selectAll()
        .where('id', '=', args.id)
        .executeTakeFirst()
      return {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.address,
        address: restaurant.address,
        tables: [],
      }
    },
    searchRestaurants: async (_: unknown, args) => {
      const restaurantsWithSearchTerm = await db
        .selectFrom('restaurant')
        .selectAll()
        .where('restaurant.name', 'ilike', `%${args.searchTerm}%`)
        .execute()
      return restaurantsWithSearchTerm.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        description: restaurant.description,
        tables: [],
      }))
    },
  },

  Mutation: {
    addNewRestaurant: async (_: unknown, args) => {
      const newRestaurant = await db
        .insertInto('restaurant')
        .values(args)
        .returningAll()
        .executeTakeFirst()
      return {
        id: newRestaurant.id,
        name: newRestaurant.name,
        description: newRestaurant.description,
        address: newRestaurant.address,
        tables: [],
      }
    },
    deleteRestaurant: async (_: unknown, args) => {
      const deletedRestaurant = await db
        .deleteFrom('restaurant')
        .where('restaurant.id', '=', args.id)
        .returning('id')
        .executeTakeFirst()
      return deletedRestaurant.id
    },
  },
}
export default restaurantResolver
