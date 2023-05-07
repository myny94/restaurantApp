import restaurants from "./dataset.js";
import { db } from "./kysely.js";

const resolvers = {
  Query: {
    restaurants: () => restaurants,
    getRestaurantById: async (_: any, args: { id: string }) => {
      const restaurant = await db
        .selectFrom("restaurant")
        .selectAll()
        .where("id", "=", args.id)
        .executeTakeFirst();
        
        return restaurant
    },
  },
};
export default resolvers;
