import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { ResolverContext } from '../ResolverContextType';
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  FeatureFlagValueType: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  setUsersFeatureFlagMutation: Array<SetUsersFeatureFlagResponse>;
};


export type MutationSetUsersFeatureFlagMutationArgs = {
  featureFlagKey: Scalars['String'];
  featureFlagValue: Scalars['FeatureFlagValueType'];
  userIds: Array<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<User>>;
};

export type SetUsersFeatureFlagResponse = {
  __typename?: 'SetUsersFeatureFlagResponse';
  userFeatureFlag: UserFeatureFlag;
};

export type User = {
  __typename?: 'User';
  emailAddress: Scalars['String'];
  familyName: Scalars['String'];
  featureFlags?: Maybe<Array<Maybe<UserFeatureFlag>>>;
  givenName: Scalars['String'];
  userId: Scalars['Int'];
};

export type UserFeatureFlag = {
  __typename?: 'UserFeatureFlag';
  featureFlagKey: Scalars['String'];
  featureFlagValue: Scalars['FeatureFlagValueType'];
  userId: Scalars['Int'];
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
  FeatureFlagValueType: ResolverTypeWrapper<Scalars['FeatureFlagValueType']>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  SetUsersFeatureFlagResponse: ResolverTypeWrapper<SetUsersFeatureFlagResponse>;
  User: ResolverTypeWrapper<User>;
  UserFeatureFlag: ResolverTypeWrapper<UserFeatureFlag>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  FeatureFlagValueType: Scalars['FeatureFlagValueType'];
  Mutation: {};
  String: Scalars['String'];
  Int: Scalars['Int'];
  Query: {};
  SetUsersFeatureFlagResponse: SetUsersFeatureFlagResponse;
  User: User;
  UserFeatureFlag: UserFeatureFlag;
  Boolean: Scalars['Boolean'];
}>;

export interface FeatureFlagValueTypeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FeatureFlagValueType'], any> {
  name: 'FeatureFlagValueType';
}

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  setUsersFeatureFlagMutation?: Resolver<Array<ResolversTypes['SetUsersFeatureFlagResponse']>, ParentType, ContextType, RequireFields<MutationSetUsersFeatureFlagMutationArgs, 'featureFlagKey' | 'featureFlagValue' | 'userIds'>>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
}>;

export type SetUsersFeatureFlagResponseResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['SetUsersFeatureFlagResponse']> = ResolversObject<{
  userFeatureFlag?: Resolver<ResolversTypes['UserFeatureFlag'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featureFlags?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserFeatureFlag']>>>, ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserFeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserFeatureFlag']> = ResolversObject<{
  featureFlagKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featureFlagValue?: Resolver<ResolversTypes['FeatureFlagValueType'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  FeatureFlagValueType?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SetUsersFeatureFlagResponse?: SetUsersFeatureFlagResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserFeatureFlag?: UserFeatureFlagResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
