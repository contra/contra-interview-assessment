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

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  givenName?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  id: Scalars['ID'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type UserFeatureFlag = {
  __typename?: 'UserFeatureFlag';
  id: Scalars['ID'];
  value?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type TargetUsersOutput = {
  __typename?: 'TargetUsersOutput';
  userId: Scalars['ID'];
  featureFlag: UserFeatureFlag;
};

export type UserWithFlag = {
  __typename?: 'UserWithFlag';
  userId: Scalars['ID'];
  featureFlags: Array<Maybe<FeatureFlag>>;
};

export type OverrideUserFeatureFlagOutput = {
  __typename?: 'OverrideUserFeatureFlagOutput';
  userId: Scalars['ID'];
  featureFlagId: Scalars['ID'];
  value: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserFeatureFlagInput = {
  id: Scalars['ID'];
  value?: Maybe<Scalars['String']>;
};

export type TargetUsersInput = {
  userId: Scalars['ID'];
  featureFlags: Array<UserFeatureFlagInput>;
};

export type OverrideUserFeatureFlagInput = {
  userId: Scalars['ID'];
  featureFlagId: Scalars['ID'];
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  targetUsers: Array<TargetUsersOutput>;
  overrideUserFeatureFlag: OverrideUserFeatureFlagOutput;
};


export type MutationTargetUsersArgs = {
  data?: Maybe<Array<Maybe<TargetUsersInput>>>;
};


export type MutationOverrideUserFeatureFlagArgs = {
  data: OverrideUserFeatureFlagInput;
};

export type Query = {
  __typename?: 'Query';
  usersWithFlags: Array<Maybe<UserWithFlag>>;
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
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  FeatureFlag: ResolverTypeWrapper<FeatureFlag>;
  UserFeatureFlag: ResolverTypeWrapper<UserFeatureFlag>;
  TargetUsersOutput: ResolverTypeWrapper<TargetUsersOutput>;
  UserWithFlag: ResolverTypeWrapper<UserWithFlag>;
  OverrideUserFeatureFlagOutput: ResolverTypeWrapper<OverrideUserFeatureFlagOutput>;
  UserFeatureFlagInput: UserFeatureFlagInput;
  TargetUsersInput: TargetUsersInput;
  OverrideUserFeatureFlagInput: OverrideUserFeatureFlagInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  FeatureFlag: FeatureFlag;
  UserFeatureFlag: UserFeatureFlag;
  TargetUsersOutput: TargetUsersOutput;
  UserWithFlag: UserWithFlag;
  OverrideUserFeatureFlagOutput: OverrideUserFeatureFlagOutput;
  UserFeatureFlagInput: UserFeatureFlagInput;
  TargetUsersInput: TargetUsersInput;
  OverrideUserFeatureFlagInput: OverrideUserFeatureFlagInput;
  Mutation: {};
  Query: {};
  Boolean: Scalars['Boolean'];
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  givenName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  familyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserFeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserFeatureFlag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TargetUsersOutputResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['TargetUsersOutput']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  featureFlag?: Resolver<ResolversTypes['UserFeatureFlag'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserWithFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserWithFlag']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  featureFlags?: Resolver<Array<Maybe<ResolversTypes['FeatureFlag']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OverrideUserFeatureFlagOutputResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['OverrideUserFeatureFlagOutput']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  featureFlagId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  targetUsers?: Resolver<Array<ResolversTypes['TargetUsersOutput']>, ParentType, ContextType, RequireFields<MutationTargetUsersArgs, never>>;
  overrideUserFeatureFlag?: Resolver<ResolversTypes['OverrideUserFeatureFlagOutput'], ParentType, ContextType, RequireFields<MutationOverrideUserFeatureFlagArgs, 'data'>>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  usersWithFlags?: Resolver<Array<Maybe<ResolversTypes['UserWithFlag']>>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  User?: UserResolvers<ContextType>;
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
  UserFeatureFlag?: UserFeatureFlagResolvers<ContextType>;
  TargetUsersOutput?: TargetUsersOutputResolvers<ContextType>;
  UserWithFlag?: UserWithFlagResolvers<ContextType>;
  OverrideUserFeatureFlagOutput?: OverrideUserFeatureFlagOutputResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
