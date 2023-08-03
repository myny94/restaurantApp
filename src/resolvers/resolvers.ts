import reservationResolver from './reservation'
import restaurantResolver from './restaurantResolver'
import { merge } from 'lodash'

const resolvers = merge({}, reservationResolver, restaurantResolver)
export default resolvers;
