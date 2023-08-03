import { reservations } from "../dataset.js";
import { db } from "../kysely.js";
import { Reservation } from "../generated/gql-types.js";

const reservationResolver = {
  Query: {
    reservations: () => reservations,
    getReservationById: async (_: any, args: { id: string }) => {
      const reservation = await db
        .selectFrom("reservation")
        .selectAll()
        .where("id", "=", args.id)
        .executeTakeFirst();
    },
  },

  Mutation: {

    addNewReservation: async (_: any, args: { reservation: Reservation }) => {
      db.insertInto("reservation")
        .values(args)
        .returning("id")
        .executeTakeFirst();
    },
    removeReservation: async (_:any, args: { id: string } ) => {
        db.deleteFrom("reservation")
        .where("reservation.id", "=", args.id)
        .executeTakeFirst();
    }
  },
};
export default reservationResolver;
