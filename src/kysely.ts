import pkg from 'pg'
import { Kysely, PostgresDialect, Generated } from 'kysely'
const { Pool } = pkg

export type Restaurant = {
  id: Generated<string>
  name: string
  description: string
  address: string
}

export type Table = {
  id: Generated<string>
  restaurant_id: string
  capacity: number
}

export type Reservation = {
  id: Generated<string>
  restaurant_id: string
  reservation_from: Date
  reservation_to: Date
  number_of_persons: number
}

export type ReservationTableAssociation = {
  reservation_id: string
  table_id: string
}

export interface Database {
  restaurant: Restaurant
  reservation: Reservation
  restaurant_table: Table
  reservation_table_association: ReservationTableAssociation
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: 'localhost',
      database: 'postgres',
      user: 'postgres',
      password: 'postgres',
    }),
  }),
})
