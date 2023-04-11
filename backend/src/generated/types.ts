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
};


export type Mutation = {
  __typename?: 'Mutation';
  updateFeatureFlagValue: UserFeatureFlag;
  targetUsersWithFeatureFlag: Array<Maybe<UserFeatureFlag>>;
};


export type MutationUpdateFeatureFlagValueArgs = {
  userId: Scalars['ID'];
  featureId: Scalars['ID'];
  flagValue: Scalars['JSON'];
};


export type MutationTargetUsersWithFeatureFlagArgs = {
  userIds: Array<Scalars['ID']>;
  featureId: Scalars['ID'];
  flagValue: Scalars['JSON'];
};

export type Query = {
  __typename?: 'Query';
  getUserFeatureFlags: Array<UserFeatureFlags>;
};

export type UserFeatureFlags = {
  __typename?: 'UserFeatureFlags';
  id: Scalars['ID'];
  givenName: Scalars['String'];
  familyName: Scalars['String'];
  emailAddress: Scalars['String'];
  features: Array<FeatureFlag>;
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  featureId: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['JSON'];
};

export type UserFeatureFlag = {
  __typename?: 'UserFeatureFlag';
  userId: Scalars['ID'];
  featureId: Scalars['ID'];
  flagValue: Scalars['JSON'];
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
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Mutation: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Query: ResolverTypeWrapper<{}>;
  UserFeatureFlags: ResolverTypeWrapper<UserFeatureFlags>;
  String: ResolverTypeWrapper<Scalars['String']>;
  FeatureFlag: ResolverTypeWrapper<FeatureFlag>;
  UserFeatureFlag: ResolverTypeWrapper<UserFeatureFlag>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  JSON: Scalars['JSON'];
  Mutation: {};
  ID: Scalars['ID'];
  Query: {};
  UserFeatureFlags: UserFeatureFlags;
  String: Scalars['String'];
  FeatureFlag: FeatureFlag;
  UserFeatureFlag: UserFeatureFlag;
  Boolean: Scalars['Boolean'];
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  updateFeatureFlagValue?: Resolver<ResolversTypes['UserFeatureFlag'], ParentType, ContextType, RequireFields<MutationUpdateFeatureFlagValueArgs, 'userId' | 'featureId' | 'flagValue'>>;
  targetUsersWithFeatureFlag?: Resolver<Array<Maybe<ResolversTypes['UserFeatureFlag']>>, ParentType, ContextType, RequireFields<MutationTargetUsersWithFeatureFlagArgs, 'userIds' | 'featureId' | 'flagValue'>>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  getUserFeatureFlags?: Resolver<Array<ResolversTypes['UserFeatureFlags']>, ParentType, ContextType>;
}>;

export type UserFeatureFlagsResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserFeatureFlags']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  features?: Resolver<Array<ResolversTypes['FeatureFlag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlag']> = ResolversObject<{
  featureId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserFeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserFeatureFlag']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  featureId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  flagValue?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UserFeatureFlags?: UserFeatureFlagsResolvers<ContextType>;
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
  UserFeatureFlag?: UserFeatureFlagResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
