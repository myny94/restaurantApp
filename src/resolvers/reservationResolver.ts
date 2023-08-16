import { db } from '../kysely.js'
import { Resolvers } from '../generated/gql-types.js'
import _ from 'lodash'
import { jsonArrayFrom } from 'kysely/helpers/postgres'

const reservationResolver: Resolvers = {
  Query: {
    reservations: async () => {
      const reservations = await db
        .selectFrom('reservation')
        .selectAll()
        .select(({ selectFrom }) => [
          jsonArrayFrom(
            selectFrom('reservation_table_association')
              .innerJoin(
                'restaurant_table',
                'restaurant_table.id',
                'reservation_table_association.table_id'
              )
              .select([
                'restaurant_table.capacity',
                'restaurant_table.id',
                'restaurant_table.restaurant_id',
              ])
              .whereRef(
                'reservation_table_association.reservation_id',
                '=',
                'reservation.id'
              )
          ).as('tables'),
        ])
        .execute()

      return reservations.map(reservation => ({
        id: reservation.id,
        reservationFrom: reservation.reservation_from,
        reservationTo: reservation.reservation_to,
        restaurantId: reservation.restaurant_id,
        numberOfPersons: reservation.number_of_persons,
        tables: reservation.tables.map(table => ({
          id: table.id,
          restaurantId: table.restaurant_id,
          capacity: table.capacity,
        })),
      }))
    },

    getReservationById: async (_: unknown, args) => {
      const reservation = await db
        .selectFrom('reservation')
        .where('id', '=', args.id)
        .selectAll()
        .select(({ selectFrom }) => [
          jsonArrayFrom(
            selectFrom('reservation_table_association')
              .innerJoin(
                'restaurant_table',
                'restaurant_table.id',
                'reservation_table_association.table_id'
              )
              .select([
                'restaurant_table.capacity',
                'restaurant_table.id',
                'restaurant_table.restaurant_id',
              ])
              .whereRef(
                'reservation_table_association.reservation_id',
                '=',
                'reservation.id'
              )
          ).as('tables'),
        ])
        .executeTakeFirst()

      return {
        id: reservation.id,
        reservationFrom: reservation.reservation_from,
        reservationTo: reservation.reservation_to,
        restaurantId: reservation.restaurant_id,
        numberOfPersons: reservation.number_of_persons,
        tables: reservation.tables.map(table => ({
          id: table.id,
          restaurantId: table.restaurant_id,
          capacity: table.capacity,
        })),
      }
    },
  },

  Mutation: {
    addNewReservation: async (_: unknown, args) => {
      const newReservation = await db
        .insertInto('reservation')
        .values(args.input)
        .returningAll()
        .executeTakeFirst()
      return {
        id: newReservation.id,
        tables: [],
        numberOfPersons: newReservation.number_of_persons,
        restaurantId: newReservation.restaurant_id,
        reservationFrom: newReservation.reservation_from,
        reservationTo: newReservation.reservation_to,
      }
    },
    deleteReservation: async (_: unknown, args) => {
      const deletedReservation = await db
        .deleteFrom('reservation')
        .where('reservation.id', '=', args.id)
        .returning('id')
        .executeTakeFirst()
      return deletedReservation.id
    },
  },
}
export default reservationResolver
