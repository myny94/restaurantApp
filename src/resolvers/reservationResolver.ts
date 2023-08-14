import { db } from '../kysely.js'
import { Resolvers } from '../generated/gql-types.js'

const reservationResolver: Resolvers = {
  Query: {
    reservations: async () => {
      const reservations = await db
        .selectFrom('reservation')
        .selectAll()
        .execute()
      return reservations.map((reservation) => ({
        id: reservation.id,
        reservationFrom: reservation.reservation_from,
        reservationTo: reservation.reservation_to,
        restaurantId: reservation.restaurant_id,
        numberOfPersons: reservation.number_of_persons,
        tables: []
      }))
    },
    getReservationById: async (_: unknown, args) => {
      const reservation = await db
        .selectFrom('reservation')
        .selectAll()
        .where('id', '=', args.id)
        .executeTakeFirst()
      return {
        id: reservation.id,
        reservationFrom: reservation.reservation_from,
        reservationTo: reservation.reservation_to,
        restaurantId: reservation.restaurant_id,
        numberOfPersons: reservation.number_of_persons,
        tables: []
      }
    },
  },

  Mutation: {
    addNewReservation: async (
      _: unknown,
      args
    ) => {
      const newReservation = await db.insertInto('reservation')
        .values(args.input)
        .returningAll()
        .executeTakeFirst()
        return {
          id: newReservation.id,
          tables: [],
          numberOfPersons : newReservation.number_of_persons,
          restaurantId: newReservation.restaurant_id,
          reservationFrom: newReservation.reservation_from,
          reservationTo: newReservation.reservation_to
        }
    },
    deleteReservation: async (_: unknown, args) => {
      const deletedReservation = await db.deleteFrom('reservation')
        .where('reservation.id', '=', args.id)
        .returning('id')
        .executeTakeFirst()
      return deletedReservation.id
    },
  },
}
export default reservationResolver
