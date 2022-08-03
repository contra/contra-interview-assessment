import type { GraphQLResolveInfo } from 'graphql';
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
};

export type Mutation = {
  __typename?: 'Mutation';
  sampleMutation: Scalars['String'];
  setFlagForUsers: SetFlagForUsersResponse;
  updateFlagForUser: FeatureFlag;
};


export type MutationSetFlagForUsersArgs = {
  input: SetFlagForUsersInput;
};


export type MutationUpdateFlagForUserArgs = {
  input: UpdateFlagForUserInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getAllUsersFlags?: Maybe<Array<UserFeatureFlags>>;
};

export type SetFlagForUsersResponse = {
  __typename?: 'SetFlagForUsersResponse';
  success: Scalars['Boolean'];
  userIds?: Maybe<Array<Scalars['Int']>>;
  flagName?: Maybe<Scalars['String']>;
  booleanValue?: Maybe<Scalars['Boolean']>;
  multivariateValue?: Maybe<Scalars['String']>;
};

export type UserFeatureFlags = {
  __typename?: 'UserFeatureFlags';
  userId: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  featureFlags?: Maybe<Array<FeatureFlag>>;
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  id: Scalars['Int'];
  name: Scalars['String'];
  booleanValue?: Maybe<Scalars['Boolean']>;
  multivariateValue?: Maybe<Scalars['String']>;
};

export type SetFlagForUsersInput = {
  userIds?: Maybe<Array<Scalars['Int']>>;
  flagId: Scalars['Int'];
  boolean_value?: Maybe<Scalars['Boolean']>;
  multivariate_value?: Maybe<Scalars['String']>;
};

export type UpdateFlagForUserInput = {
  userId: Scalars['Int'];
  flagId: Scalars['Int'];
  boolean_value?: Maybe<Scalars['Boolean']>;
  multivariate_value?: Maybe<Scalars['String']>;
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
  SetFlagForUsersResponse: ResolverTypeWrapper<SetFlagForUsersResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  UserFeatureFlags: ResolverTypeWrapper<UserFeatureFlags>;
  FeatureFlag: ResolverTypeWrapper<FeatureFlag>;
  SetFlagForUsersInput: SetFlagForUsersInput;
  UpdateFlagForUserInput: UpdateFlagForUserInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Mutation: {};
  String: Scalars['String'];
  Query: {};
  SetFlagForUsersResponse: SetFlagForUsersResponse;
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  UserFeatureFlags: UserFeatureFlags;
  FeatureFlag: FeatureFlag;
  SetFlagForUsersInput: SetFlagForUsersInput;
  UpdateFlagForUserInput: UpdateFlagForUserInput;
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  sampleMutation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  setFlagForUsers?: Resolver<ResolversTypes['SetFlagForUsersResponse'], ParentType, ContextType, RequireFields<MutationSetFlagForUsersArgs, 'input'>>;
  updateFlagForUser?: Resolver<ResolversTypes['FeatureFlag'], ParentType, ContextType, RequireFields<MutationUpdateFlagForUserArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getAllUsersFlags?: Resolver<Maybe<Array<ResolversTypes['UserFeatureFlags']>>, ParentType, ContextType>;
}>;

export type SetFlagForUsersResponseResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['SetFlagForUsersResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userIds?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  flagName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  booleanValue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  multivariateValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserFeatureFlagsResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserFeatureFlags']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featureFlags?: Resolver<Maybe<Array<ResolversTypes['FeatureFlag']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  booleanValue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  multivariateValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SetFlagForUsersResponse?: SetFlagForUsersResponseResolvers<ContextType>;
  UserFeatureFlags?: UserFeatureFlagsResolvers<ContextType>;
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
