import { db } from '../kysely.js'
import { Resolvers } from '../generated/gql-types.js'
import { jsonArrayFrom } from 'kysely/helpers/postgres'

const restaurantResolver: Resolvers = {
  Query: {
    restaurants: async () => {
      const restaurants = await db
        .selectFrom('restaurant')
        .selectAll()
        .select(({ selectFrom }) => [
          jsonArrayFrom(
            selectFrom('restaurant_table')
              .select([
                'restaurant_table.capacity',
                'restaurant_table.id',
                'restaurant_table.restaurant_id',
              ])
              .whereRef('restaurant_table.restaurant_id', '=', 'restaurant.id')
          ).as('tables'),
        ])
        .execute()

      return restaurants.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        description: restaurant.description,
        tables: restaurant.tables.map(table => ({
          id: table.id,
          restaurantId: table.restaurant_id,
          capacity: table.capacity,
        })),
      }))
    },

    getRestaurantById: async (_: unknown, args) => {
      const restaurant = await db
        .selectFrom('restaurant')
        .where('id', '=', args.id)
        .selectAll()
        .select(({ selectFrom }) => [
          jsonArrayFrom(
            selectFrom('restaurant_table')
              .select([
                'restaurant_table.capacity',
                'restaurant_table.id',
                'restaurant_table.restaurant_id',
              ])
              .whereRef('restaurant_table.restaurant_id', '=', 'restaurant.id')
          ).as('tables'),
        ])
        .executeTakeFirst()

      if (restaurant) {
        return {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.address,
          address: restaurant.address,
          tables: restaurant.tables.map(table => ({
            id: table.id,
            restaurantId: table.restaurant_id,
            capacity: table.capacity,
          })),
        }
      } else {
        return null
      }
    },

    searchRestaurants: async (_: unknown, args) => {
      const restaurantsWithSearchTerm = await db
        .selectFrom('restaurant')
        .selectAll()
        .where('restaurant.name', 'like', `%${args.searchTerm}%`)
        .select(({ selectFrom }) => [
          jsonArrayFrom(
            selectFrom('restaurant_table')
              .select([
                'restaurant_table.capacity',
                'restaurant_table.id',
                'restaurant_table.restaurant_id',
              ])
              .whereRef('restaurant_table.restaurant_id', '=', 'restaurant.id')
          ).as('tables'),
        ])
        .execute()
      return restaurantsWithSearchTerm.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        description: restaurant.description,
        tables: restaurant.tables.map(table => ({
          id: table.id,
          restaurantId: table.restaurant_id,
          capacity: table.capacity,
        })),
      }))
    },
  },

  Mutation: {
    addNewRestaurant: async (_: unknown, args) => {
      const newRestaurant = await db
        .insertInto('restaurant')
        .values({
          description: args.input.description,
          name: args.input.name,
          address: args.input.address,
        })
        .returningAll()
        .executeTakeFirst()
      if (newRestaurant) {
        const tables = await db
          .insertInto('restaurant_table')
          .values(
            args.input.table.map(table => ({
              restaurant_id: newRestaurant.id,
              capacity: table.capacity,
            }))
          )
          .returningAll()
          .execute()
        console.log(tables)
        return {
          id: newRestaurant.id,
          name: newRestaurant.name,
          description: newRestaurant.description,
          address: newRestaurant.address,
          tables: tables.map(table => ({
            id: table.id,
            capacity: table.capacity,
            restaurantId: table.restaurant_id,
          })),
        }
      } else {
        throw new Error('failed to add a new restaurant')
      }
    },
    deleteRestaurant: async (_: unknown, args) => {
      const deletedRestaurant = await db
        .deleteFrom('restaurant')
        .where('restaurant.id', '=', args.id)
        .returning('id')
        .executeTakeFirst()
      return deletedRestaurant?.id ?? null
    },
  },
}
export default restaurantResolver
