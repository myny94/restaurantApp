import reservationResolver from './reservationResolver.js'
import restaurantResolver from './restaurantResolver.js'
import pkg from 'lodash'

const { merge } = pkg
const resolvers = merge({}, reservationResolver, restaurantResolver)
export default resolvers
