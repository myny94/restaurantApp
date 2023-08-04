import { restaurants } from '../dataset.js'
import { db } from '../kysely.js'
import { RestaurantInput } from '../generated/gql-types.js'

const restaurantResolver = {
  Query: {
    restaurants: () => restaurants,
    getRestaurantById: async (args: { id: string }) => {
      const restaurant = await db
        .selectFrom('restaurant')
        .selectAll()
        .where('id', '=', args.id)
        .executeTakeFirst()
      return restaurant
    },
    searchRestaurants: async (_: any, args: { searchTerm: string }) => {
      const restaurantsWithSearchTerm = db
        .selectFrom('restaurant')
        .selectAll()
        .where('restaurant.name', 'ilike', `%${args.searchTerm}%`)
      return restaurantsWithSearchTerm
    },
    getTables: async (_: any, args: { restaurantId: string }) => {
      const tables = db
        .selectFrom('restaurant')
        .select('tables')
        .where('restaurant.id', '=', args.restaurantId)
      return tables
    },
  },

  Mutation: {
    addNewRestaurant: async (_: any, args: { restaurant: RestaurantInput }) => {
      db.insertInto('restaurant')
        .values(args)
        .returning('id')
        .executeTakeFirst()
    },
    updateRestaurant: async (
      _: any,
      args: { id: string; updatedRestaurant: RestaurantInput }
    ) => {
      db.updateTable('restaurant')
        .set(args.updatedRestaurant)
        .where('id', '=', args.id)
        .executeTakeFirst()
    },
    deleteRestaurant: async (_: any, args: { id: string }) => {
      db.deleteFrom('restaurant')
        .where('restaurant.id', '=', args.id)
        .executeTakeFirst()
    },
  },
}
export default restaurantResolver
