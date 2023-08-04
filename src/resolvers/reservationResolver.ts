import { reservations } from '../dataset.js'
import { db } from '../kysely.js'
import { ReservationInput } from '../generated/gql-types.js'

const reservationResolver = {
  Query: {
    reservations: () => reservations,
    getReservationById: async (_: any, args: { id: string }) => {
      const reservation = await db
        .selectFrom('reservation')
        .selectAll()
        .where('id', '=', args.id)
        .executeTakeFirst()
      return reservation
    },
  },

  Mutation: {
    addNewReservation: async (
      _: any,
      args: { reservation: ReservationInput }
    ) => {
      db.insertInto('reservation')
        .values(args)
        .returning('id')
        .executeTakeFirst()
    },
    updateReservation: async (
      _: any,
      args: { id: string; updatedReservation: ReservationInput }
    ) => {
      db.updateTable('reservation')
        .set(args.updatedReservation)
        .where('id', '=', args.id)
        .executeTakeFirst()
    },
    deleteReservation: async (_: any, args: { id: string }) => {
      db.deleteFrom('reservation')
        .where('reservation.id', '=', args.id)
        .executeTakeFirst()
    },
  },
}
export default reservationResolver
