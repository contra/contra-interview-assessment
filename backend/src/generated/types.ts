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
  JSON: any;
};


export type Query = {
  __typename?: 'Query';
  getUsers: Array<User>;
  getFeatureFlags: Array<FeatureFlag>;
};

export type Mutation = {
  __typename?: 'Mutation';
  setUsersFeatureFlag: SuccessPayload;
  updateUserFlag: SuccessPayload;
};


export type MutationSetUsersFeatureFlagArgs = {
  input: SetUsersFeatureFlagInput;
};


export type MutationUpdateUserFlagArgs = {
  input: UpdateUserFlagInput;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  given_name: Scalars['String'];
  family_name: Scalars['String'];
  email_address: Scalars['String'];
  feature_flags: Array<UserFlag>;
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type UserFlag = {
  __typename?: 'UserFlag';
  id: Scalars['String'];
  user: User;
  featureFlag: FeatureFlag;
  value: Scalars['String'];
};

export enum FlagType {
  Boolean = 'BOOLEAN',
  Multivariant = 'MULTIVARIANT'
}

export type SetUsersFeatureFlagInput = {
  userIds: Array<Scalars['String']>;
  featureFlagId: Scalars['String'];
  value: Scalars['String'];
};

export type UpdateUserFlagInput = {
  userId: Scalars['String'];
  featureFlagId: Scalars['String'];
  value: Scalars['String'];
};

export type SuccessPayload = {
  __typename?: 'SuccessPayload';
  success: Scalars['Boolean'];
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
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  String: ResolverTypeWrapper<Scalars['String']>;
  FeatureFlag: ResolverTypeWrapper<FeatureFlag>;
  UserFlag: ResolverTypeWrapper<UserFlag>;
  FlagType: FlagType;
  setUsersFeatureFlagInput: SetUsersFeatureFlagInput;
  updateUserFlagInput: UpdateUserFlagInput;
  SuccessPayload: ResolverTypeWrapper<SuccessPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  JSON: Scalars['JSON'];
  Query: {};
  Mutation: {};
  User: User;
  String: Scalars['String'];
  FeatureFlag: FeatureFlag;
  UserFlag: UserFlag;
  setUsersFeatureFlagInput: SetUsersFeatureFlagInput;
  updateUserFlagInput: UpdateUserFlagInput;
  SuccessPayload: SuccessPayload;
  Boolean: Scalars['Boolean'];
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  getUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  getFeatureFlags?: Resolver<Array<ResolversTypes['FeatureFlag']>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  setUsersFeatureFlag?: Resolver<ResolversTypes['SuccessPayload'], ParentType, ContextType, RequireFields<MutationSetUsersFeatureFlagArgs, 'input'>>;
  updateUserFlag?: Resolver<ResolversTypes['SuccessPayload'], ParentType, ContextType, RequireFields<MutationUpdateUserFlagArgs, 'input'>>;
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  given_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  family_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feature_flags?: Resolver<Array<ResolversTypes['UserFlag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserFlag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  featureFlag?: Resolver<ResolversTypes['FeatureFlag'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SuccessPayloadResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['SuccessPayload']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  JSON?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
  UserFlag?: UserFlagResolvers<ContextType>;
  SuccessPayload?: SuccessPayloadResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
