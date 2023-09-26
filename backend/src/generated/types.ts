import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { ResolverContext } from '../ResolverContextType';
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string | number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  Timestamp: any;
};

export type Flag = {
  __typename?: 'Flag';
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: FlagTypeEnum;
  updatedAt: Scalars['Timestamp'];
  value: Scalars['JSON'];
};

export enum FlagTypeEnum {
  Boolean = 'boolean',
  Multi = 'multi',
  Text = 'text'
}


export type Mutation = {
  __typename?: 'Mutation';
  targetUsers: TargetUsersResult;
  updateFlagForUser: UpdateFlagForUserResult;
};


export type MutationTargetUsersArgs = {
  input: TargetUsersInput;
};


export type MutationUpdateFlagForUserArgs = {
  input: UpdateFlagForUserInput;
};

export type Query = {
  __typename?: 'Query';
  flag: Flag;
  flags: Array<Flag>;
  user: User;
  users: Array<User>;
};


export type QueryFlagArgs = {
  flagId: Scalars['ID'];
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};

export type TargetUsersInput = {
  flagId: Scalars['ID'];
  userIds: Array<Scalars['ID']>;
  value?: Maybe<Scalars['JSON']>;
};

export type TargetUsersResult = {
  __typename?: 'TargetUsersResult';
  success: Scalars['Boolean'];
};


export type UpdateFlagForUserInput = {
  flagId: Scalars['ID'];
  userId: Scalars['ID'];
  value: Scalars['JSON'];
};

export type UpdateFlagForUserResult = {
  __typename?: 'UpdateFlagForUserResult';
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Timestamp'];
  emailAddress: Scalars['String'];
  familyName: Scalars['String'];
  flags: Array<Flag>;
  givenName: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['Timestamp'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
export type ResolversTypes = ResolversObject<{
  Flag: ResolverTypeWrapper<Flag>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  FlagTypeEnum: FlagTypeEnum;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  TargetUsersInput: TargetUsersInput;
  TargetUsersResult: ResolverTypeWrapper<TargetUsersResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  UpdateFlagForUserInput: UpdateFlagForUserInput;
  UpdateFlagForUserResult: ResolverTypeWrapper<UpdateFlagForUserResult>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Flag: Flag;
  String: Scalars['String'];
  ID: Scalars['ID'];
  JSON: Scalars['JSON'];
  Mutation: {};
  Query: {};
  TargetUsersInput: TargetUsersInput;
  TargetUsersResult: TargetUsersResult;
  Boolean: Scalars['Boolean'];
  Timestamp: Scalars['Timestamp'];
  UpdateFlagForUserInput: UpdateFlagForUserInput;
  UpdateFlagForUserResult: UpdateFlagForUserResult;
  User: User;
}>;

export type FlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Flag']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['FlagTypeEnum'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  targetUsers?: Resolver<ResolversTypes['TargetUsersResult'], ParentType, ContextType, RequireFields<MutationTargetUsersArgs, 'input'>>;
  updateFlagForUser?: Resolver<ResolversTypes['UpdateFlagForUserResult'], ParentType, ContextType, RequireFields<MutationUpdateFlagForUserArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  flag?: Resolver<ResolversTypes['Flag'], ParentType, ContextType, RequireFields<QueryFlagArgs, 'flagId'>>;
  flags?: Resolver<Array<ResolversTypes['Flag']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type TargetUsersResultResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['TargetUsersResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type UpdateFlagForUserResultResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UpdateFlagForUserResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flags?: Resolver<Array<ResolversTypes['Flag']>, ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  Flag?: FlagResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TargetUsersResult?: TargetUsersResultResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  UpdateFlagForUserResult?: UpdateFlagForUserResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
