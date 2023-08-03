import pkg from "pg";
import { Kysely, PostgresDialect, Generated } from "kysely";
const { Pool } = pkg;

export type RestaurantTable = {
  id: Generated<string>;
  restaurant_id: string;
  capacity: number;
  description: string;
};

export type Restaurant = {
  id: Generated<string>;
  name: string;
  description: string;
  address: string;
};

export type Reservation = {
  id: Generated<string>;
  restaurant_id: string;
  reservationFrom: Date;
  reservationTo: Date;
  numberOfPersons: Number;
};

export type ReservationTable = {
  reservation_id: string;
  table_id: string;
};

export interface Database {
  restaurant: Restaurant;
  reservation: Reservation;
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: "localhost",
      database: "postgres",
      user: "postgres",
      password: "postgres",
    }),
  }),
});
