import type { GraphQLResolveInfo } from 'graphql';
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
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  targetUsers: FeatureFlag;
  updateUserFeatureFlag?: Maybe<User>;
};


export type MutationTargetUsersArgs = {
  featureFlagId: Scalars['ID'];
  userIds: Array<Scalars['ID']>;
};


export type MutationUpdateUserFeatureFlagArgs = {
  userId: Scalars['ID'];
  featureFlagId: Scalars['ID'];
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  featureFlag?: Maybe<FeatureFlag>;
  featureFlags: Array<FeatureFlag>;
  featureFlagsWithUsers?: Maybe<Array<FeatureFlag>>;
  user?: Maybe<User>;
  userFeatureFlags: Array<UserFeatureFlag>;
  users: Array<User>;
  usersWithFeatureFlags?: Maybe<Array<User>>;
};


export type QueryFeatureFlagArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  featureFlags?: Maybe<Array<Maybe<FeatureFlag>>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UserFeatureFlag = {
  __typename?: 'UserFeatureFlag';
  featureFlag: FeatureFlag;
  user: User;
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
  FeatureFlag: ResolverTypeWrapper<FeatureFlag>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserFeatureFlag: ResolverTypeWrapper<UserFeatureFlag>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  FeatureFlag: FeatureFlag;
  String: Scalars['String'];
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  User: User;
  UserFeatureFlag: UserFeatureFlag;
  Boolean: Scalars['Boolean'];
}>;

export type FeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlag']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  targetUsers?: Resolver<ResolversTypes['FeatureFlag'], ParentType, ContextType, RequireFields<MutationTargetUsersArgs, 'featureFlagId' | 'userIds'>>;
  updateUserFeatureFlag?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserFeatureFlagArgs, 'userId' | 'featureFlagId' | 'value'>>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  featureFlag?: Resolver<Maybe<ResolversTypes['FeatureFlag']>, ParentType, ContextType, RequireFields<QueryFeatureFlagArgs, 'id'>>;
  featureFlags?: Resolver<Array<ResolversTypes['FeatureFlag']>, ParentType, ContextType>;
  featureFlagsWithUsers?: Resolver<Maybe<Array<ResolversTypes['FeatureFlag']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userFeatureFlags?: Resolver<Array<ResolversTypes['UserFeatureFlag']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  usersWithFeatureFlags?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featureFlags?: Resolver<Maybe<Array<Maybe<ResolversTypes['FeatureFlag']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserFeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserFeatureFlag']> = ResolversObject<{
  featureFlag?: Resolver<ResolversTypes['FeatureFlag'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserFeatureFlag?: UserFeatureFlagResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
