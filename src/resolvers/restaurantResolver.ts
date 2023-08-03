import { restaurants, reservations } from "../dataset.js";
import { db } from "../kysely.js";
import { Restaurant } from "../generated/gql-types.js";

const restaurantResolver = {
  Query: {
    restaurants: () => restaurants,
    getRestaurantById: async (_: any, args: { id: string }) => {
      const restaurant = await db
        .selectFrom("restaurant")
        .selectAll()
        .where("id", "=", args.id)
        .executeTakeFirst();
      return restaurant;
    },
    searchRestaurants: async (_: any, args: { searchTerm: string }) => {
      const restaurantsWithSearchTerm = db
        .selectFrom("restaurant")
        .selectAll()
        .where("restaurant.name", "ilike", `%${args.searchTerm}%`);
      return restaurantsWithSearchTerm;
    },
  },

  Mutation: {
    addNewRestaurant: async (_: any, args: { restaurant: Restaurant }) => {
      db.insertInto("restaurant")
        .values(args)
        .returning("id")
        .executeTakeFirst();
    },
    updateRestaurant: async (
      _: any,
      args: { updatedRestaurant: Restaurant }
    ) => {
      db.updateTable("restaurant")
        .set(args.updatedRestaurant)
        .where("id", "=", args.updatedRestaurant.id)
        .executeTakeFirst();
    },
    removeRestaurant: async (_:any, args: { id: string } ) => {
      db.deleteFrom("restaurant")
      .where("restaurant.id", "=", args.id)
      .executeTakeFirst();
  }
  },
};
export default restaurantResolver;

