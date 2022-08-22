import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { ResolverContext } from '../ResolverContextType';
import { FeatureFlagValue, FeatureFlagType } from '../schema/resolvers/Scalars/featureFlagScalars'
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
  FeatureFlagValue: FeatureFlagValue;
  FeatureFlagType: FeatureFlagType;
};

export type Mutation = {
  __typename?: 'Mutation';
  sampleMutation: Scalars['String'];
  setUsersFeatureFlag: Array<SetUserFeatureFlagResponse>;
  removeUsersFeatureFlag: Array<RemoveUserFeatureFlagResponse>;
};


export type MutationSetUsersFeatureFlagArgs = {
  userIds: Array<Scalars['String']>;
  featureFlagData: UserFeatureFlagData;
};


export type MutationRemoveUsersFeatureFlagArgs = {
  userIds: Array<Scalars['String']>;
  featureFlagKey: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  featureFlags?: Maybe<Array<FeatureFlag>>;
  users?: Maybe<Array<User>>;
};



export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  flagKey: Scalars['String'];
  flagType: Scalars['FeatureFlagType'];
  defaultValue?: Maybe<Scalars['FeatureFlagValue']>;
};

export type FeatureFlagUserValue = {
  __typename?: 'FeatureFlagUserValue';
  userId: Scalars['String'];
  flagKey: Scalars['String'];
  flagType: Scalars['FeatureFlagType'];
  flagValue: Scalars['FeatureFlagValue'];
};

export type SetUserFeatureFlagResponse = {
  __typename?: 'SetUserFeatureFlagResponse';
  userId: Scalars['String'];
  result: Scalars['String'];
};

export type RemoveUserFeatureFlagResponse = {
  __typename?: 'RemoveUserFeatureFlagResponse';
  userId: Scalars['String'];
  result: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  userId: Scalars['Int'];
  givenName: Scalars['String'];
  familyName: Scalars['String'];
  emailAddress: Scalars['String'];
  featureFlags?: Maybe<Array<Maybe<FeatureFlagUserValue>>>;
};

export type UserFeatureFlagData = {
  flagKey: Scalars['String'];
  flagValue: Scalars['FeatureFlagValue'];
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
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  FeatureFlagValue: ResolverTypeWrapper<Scalars['FeatureFlagValue']>;
  FeatureFlagType: ResolverTypeWrapper<Scalars['FeatureFlagType']>;
  FeatureFlag: ResolverTypeWrapper<FeatureFlag>;
  FeatureFlagUserValue: ResolverTypeWrapper<FeatureFlagUserValue>;
  SetUserFeatureFlagResponse: ResolverTypeWrapper<SetUserFeatureFlagResponse>;
  RemoveUserFeatureFlagResponse: ResolverTypeWrapper<RemoveUserFeatureFlagResponse>;
  User: ResolverTypeWrapper<User>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  UserFeatureFlagData: UserFeatureFlagData;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Mutation: {};
  String: Scalars['String'];
  Query: {};
  FeatureFlagValue: Scalars['FeatureFlagValue'];
  FeatureFlagType: Scalars['FeatureFlagType'];
  FeatureFlag: FeatureFlag;
  FeatureFlagUserValue: FeatureFlagUserValue;
  SetUserFeatureFlagResponse: SetUserFeatureFlagResponse;
  RemoveUserFeatureFlagResponse: RemoveUserFeatureFlagResponse;
  User: User;
  Int: Scalars['Int'];
  UserFeatureFlagData: UserFeatureFlagData;
  Boolean: Scalars['Boolean'];
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  sampleMutation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  setUsersFeatureFlag?: Resolver<Array<ResolversTypes['SetUserFeatureFlagResponse']>, ParentType, ContextType, RequireFields<MutationSetUsersFeatureFlagArgs, 'userIds' | 'featureFlagData'>>;
  removeUsersFeatureFlag?: Resolver<Array<ResolversTypes['RemoveUserFeatureFlagResponse']>, ParentType, ContextType, RequireFields<MutationRemoveUsersFeatureFlagArgs, 'userIds' | 'featureFlagKey'>>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featureFlags?: Resolver<Maybe<Array<ResolversTypes['FeatureFlag']>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
}>;

export interface FeatureFlagValueScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FeatureFlagValue'], any> {
  name: 'FeatureFlagValue';
}

export interface FeatureFlagTypeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FeatureFlagType'], any> {
  name: 'FeatureFlagType';
}

export type FeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlag']> = ResolversObject<{
  flagKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flagType?: Resolver<ResolversTypes['FeatureFlagType'], ParentType, ContextType>;
  defaultValue?: Resolver<Maybe<ResolversTypes['FeatureFlagValue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeatureFlagUserValueResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlagUserValue']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flagKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flagType?: Resolver<ResolversTypes['FeatureFlagType'], ParentType, ContextType>;
  flagValue?: Resolver<ResolversTypes['FeatureFlagValue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetUserFeatureFlagResponseResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['SetUserFeatureFlagResponse']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RemoveUserFeatureFlagResponseResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['RemoveUserFeatureFlagResponse']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featureFlags?: Resolver<Maybe<Array<Maybe<ResolversTypes['FeatureFlagUserValue']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  FeatureFlagValue?: GraphQLScalarType;
  FeatureFlagType?: GraphQLScalarType;
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
  FeatureFlagUserValue?: FeatureFlagUserValueResolvers<ContextType>;
  SetUserFeatureFlagResponse?: SetUserFeatureFlagResponseResolvers<ContextType>;
  RemoveUserFeatureFlagResponse?: RemoveUserFeatureFlagResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
