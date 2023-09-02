import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  addNewReservation: Reservation;
  addNewRestaurant: Restaurant;
  deleteReservation?: Maybe<Scalars['String']['output']>;
  deleteRestaurant?: Maybe<Scalars['String']['output']>;
};


export type MutationAddNewReservationArgs = {
  input: ReservationInput;
};


export type MutationAddNewRestaurantArgs = {
  input: RestaurantInput;
};


export type MutationDeleteReservationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteRestaurantArgs = {
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getReservationById?: Maybe<Reservation>;
  getRestaurantById?: Maybe<Restaurant>;
  getTables?: Maybe<Array<Maybe<Table>>>;
  reservations?: Maybe<Array<Maybe<Reservation>>>;
  restaurants?: Maybe<Array<Maybe<Restaurant>>>;
  searchRestaurants?: Maybe<Array<Maybe<Restaurant>>>;
  tables?: Maybe<Array<Maybe<Table>>>;
};


export type QueryGetReservationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetRestaurantByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTablesArgs = {
  restaurantId?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchRestaurantsArgs = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['ID']['output'];
  numberOfPersons: Scalars['Int']['output'];
  reservationFrom: Scalars['Date']['output'];
  reservationTo: Scalars['Date']['output'];
  restaurantId: Scalars['String']['output'];
  tables: Array<Table>;
};

export type ReservationInput = {
  numberOfPersons: Scalars['Int']['input'];
  reservationFrom: Scalars['Date']['input'];
  reservationTo: Scalars['Date']['input'];
  restaurantId: Scalars['String']['input'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  address: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tables: Array<Table>;
};

export type RestaurantInput = {
  address: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  table: Array<TableInput>;
};

export type Table = {
  __typename?: 'Table';
  capacity: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  restaurantId: Scalars['String']['output'];
};

export type TableInput = {
  capacity: Scalars['Int']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Reservation: ResolverTypeWrapper<Reservation>;
  ReservationInput: ReservationInput;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  RestaurantInput: RestaurantInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Table: ResolverTypeWrapper<Table>;
  TableInput: TableInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  Reservation: Reservation;
  ReservationInput: ReservationInput;
  Restaurant: Restaurant;
  RestaurantInput: RestaurantInput;
  String: Scalars['String']['output'];
  Table: Table;
  TableInput: TableInput;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addNewReservation?: Resolver<ResolversTypes['Reservation'], ParentType, ContextType, RequireFields<MutationAddNewReservationArgs, 'input'>>;
  addNewRestaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<MutationAddNewRestaurantArgs, 'input'>>;
  deleteReservation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteReservationArgs, 'id'>>;
  deleteRestaurant?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteRestaurantArgs, 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getReservationById?: Resolver<Maybe<ResolversTypes['Reservation']>, ParentType, ContextType, RequireFields<QueryGetReservationByIdArgs, 'id'>>;
  getRestaurantById?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType, RequireFields<QueryGetRestaurantByIdArgs, 'id'>>;
  getTables?: Resolver<Maybe<Array<Maybe<ResolversTypes['Table']>>>, ParentType, ContextType, Partial<QueryGetTablesArgs>>;
  reservations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reservation']>>>, ParentType, ContextType>;
  restaurants?: Resolver<Maybe<Array<Maybe<ResolversTypes['Restaurant']>>>, ParentType, ContextType>;
  searchRestaurants?: Resolver<Maybe<Array<Maybe<ResolversTypes['Restaurant']>>>, ParentType, ContextType, Partial<QuerySearchRestaurantsArgs>>;
  tables?: Resolver<Maybe<Array<Maybe<ResolversTypes['Table']>>>, ParentType, ContextType>;
};

export type ReservationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reservation'] = ResolversParentTypes['Reservation']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  numberOfPersons?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reservationFrom?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  reservationTo?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tables?: Resolver<Array<ResolversTypes['Table']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RestaurantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tables?: Resolver<Array<ResolversTypes['Table']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TableResolvers<ContextType = any, ParentType extends ResolversParentTypes['Table'] = ResolversParentTypes['Table']> = {
  capacity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reservation?: ReservationResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  Table?: TableResolvers<ContextType>;
};

