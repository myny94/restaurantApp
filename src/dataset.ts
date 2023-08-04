export const restaurants = [
  {
    id: 'id1',
    name: 'restaurant 1',
    address: 'street 1',
    table: [
      {
        id: 'table1',
        restaurantId: 'id1',
        capacity: 4,
        description: 'normal table',
      },
      {
        id: 'table2',
        restaurantId: 'id1',
        capacity: 2,
        description: 'normal table 2',
      },
      {
        id: 'table3',
        restaurantId: 'id1',
        capacity: 6,
        description: 'VIP table',
      },
    ],
  },
  {
    id: 'id2',
    name: 'restaurant 2',
    address: 'street 2',
    table: [
      {
        id: 'table1',
        restaurantId: 'id2',
        capacity: 4,
        description: 'normal table',
      },
    ],
  },
]

export const reservations = []
