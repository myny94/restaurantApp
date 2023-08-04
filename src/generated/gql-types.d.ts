export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Date: { input: any; output: any }
}

export type Mutation = {
  __typename?: 'Mutation'
  addNewReservation: Reservation
  addNewRestaurant: Restaurant
  deleteReservation: Reservation
  deleteRestaurant: Restaurant
  updateReservation: Reservation
  updateRestaurant: Restaurant
}

export type MutationAddNewReservationArgs = {
  input?: InputMaybe<ReservationInput>
}

export type MutationAddNewRestaurantArgs = {
  input?: InputMaybe<RestaurantInput>
}

export type MutationDeleteReservationArgs = {
  id: Scalars['String']['input']
}

export type MutationDeleteRestaurantArgs = {
  id: Scalars['String']['input']
}

export type MutationUpdateReservationArgs = {
  id: Scalars['String']['input']
  updatedReservation: ReservationInput
}

export type MutationUpdateRestaurantArgs = {
  updatedRestaurant: RestaurantInput
}

export type Query = {
  __typename?: 'Query'
  getReservationById?: Maybe<Reservation>
  getRestaurantById?: Maybe<Restaurant>
  getTables?: Maybe<Array<Maybe<Table>>>
  reservations?: Maybe<Array<Maybe<Reservation>>>
  restaurants?: Maybe<Array<Maybe<Restaurant>>>
  searchRestaurants?: Maybe<Array<Maybe<Restaurant>>>
  tables?: Maybe<Array<Maybe<Table>>>
}

export type QueryGetReservationByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>
}

export type QueryGetRestaurantByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>
}

export type QueryGetTablesArgs = {
  restaurantId?: InputMaybe<Scalars['String']['input']>
}

export type QuerySearchRestaurantsArgs = {
  searchTerm?: InputMaybe<Scalars['String']['input']>
}

export type Reservation = {
  __typename?: 'Reservation'
  id: Scalars['ID']['output']
  numberOfPersons?: Maybe<Scalars['Int']['output']>
  reservationFrom?: Maybe<Scalars['Date']['output']>
  reservationTo?: Maybe<Scalars['Date']['output']>
  restaurantId?: Maybe<Scalars['String']['output']>
  tables?: Maybe<Array<Maybe<Table>>>
}

export type ReservationInput = {
  __typename?: 'ReservationInput'
  numberOfPersons?: Maybe<Scalars['Int']['output']>
  reservationFrom?: Maybe<Scalars['Date']['output']>
  reservationTo?: Maybe<Scalars['Date']['output']>
  restaurantId?: Maybe<Scalars['String']['output']>
  tables?: Maybe<Array<Maybe<Table>>>
}

export type Restaurant = {
  __typename?: 'Restaurant'
  address: Scalars['String']['output']
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  table: Array<Table>
}

export type RestaurantInput = {
  __typename?: 'RestaurantInput'
  address: Scalars['String']['output']
  description: Scalars['String']['output']
  name: Scalars['String']['output']
  table: Array<Table>
}

export type Table = {
  __typename?: 'Table'
  capacity?: Maybe<Scalars['Int']['output']>
  id: Scalars['ID']['output']
  restaurantId: Scalars['String']['output']
}
