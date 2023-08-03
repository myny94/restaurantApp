export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  updateRestaurant: Restaurant;
};


export type MutationUpdateRestaurantArgs = {
  input?: InputMaybe<RestaurantInput>;
};

export type Query = {
  __typename?: 'Query';
  getRestaurantById?: Maybe<Restaurant>;
  restaurants?: Maybe<Array<Maybe<Restaurant>>>;
};


export type QueryGetRestaurantByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['ID']['output'];
  numberOfPersons?: Maybe<Scalars['Int']['output']>;
  reservationFrom?: Maybe<Scalars['Date']['output']>;
  reservationTo?: Maybe<Scalars['Date']['output']>;
  restaurantId?: Maybe<Scalars['String']['output']>;
  tables?: Maybe<Array<Maybe<Table>>>;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  address: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  table: Array<Table>;
};

export type RestaurantInput = {
  address: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  table: Array<Table>;
};

export type Table = {
  __typename?: 'Table';
  capacity?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  restaurantId: Scalars['String']['output'];
};
