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

    tables: async () => {
      const tables = await db
        .selectFrom('restaurant_table')
        .selectAll()
        .execute()
      return tables.map(table => ({
        id: table.id,
        restaurantId: table.restaurant_id,
        capacity: table.capacity,
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
        .executeTakeFirstOrThrow()

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
    },
    deleteRestaurant: async (_: unknown, args) => {
      const deletedRestaurant = await db
        .deleteFrom('restaurant')
        .where('restaurant.id', '=', args.id)
        .returning('id')
        .executeTakeFirstOrThrow()
      return deletedRestaurant?.id
    },
    addTableToRestaurant: async (_: unknown, args) => {
      const newTable = await db
        .insertInto('restaurant_table')
        .values({
          restaurant_id: args.restaurantId,
          capacity: args.input?.capacity,
        })
        .returningAll()
        .executeTakeFirstOrThrow()
      return {
        id: newTable.id,
        restaurantId: newTable.restaurant_id,
        capacity: newTable.capacity,
      }
    },
    removeTableFromRestaurant: async (_: unknown, args) => {
      const deletedTable = await db
        .deleteFrom('restaurant')
        .where('restaurant.id', '=', args.id)
        .returning('id')
        .executeTakeFirstOrThrow()
      return deletedTable?.id
    },
  },
}
export default restaurantResolver
