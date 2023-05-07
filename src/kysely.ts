import pkg from 'pg';
import { Kysely, PostgresDialect, Generated } from "kysely";
const { Pool } = pkg;

type Table = {
  id: Generated<string>;
  restaurantId: string;
  capacity: number;
  description: string;
};

interface RestaurantTable {
  id: Generated<string>;
  name: string;
  address: string;
}

interface Database {
  restaurant: RestaurantTable;
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: "localhost",
      database: "postgres",
      user: "postgres",
      password: "postgres"
    }),
  }),
});