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

export type FeatureFlagInput = {
  value?: Maybe<Scalars['String']>;
  valueType?: Maybe<Scalars['String']>;
};

export type UserAccountInput = {
  givenName?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateFeatureFlags?: Maybe<Array<Maybe<FeatureFlag>>>;
  updateUserAccounts?: Maybe<Array<Maybe<UserAccount>>>;
};


export type MutationUpdateFeatureFlagsArgs = {
  userAccountIds: Array<Scalars['ID']>;
  input: FeatureFlagInput;
};


export type MutationUpdateUserAccountsArgs = {
  featureFlagId: Scalars['ID'];
  input: UserAccountInput;
};

export type Query = {
  __typename?: 'Query';
  userAccounts?: Maybe<Array<Maybe<UserAccount>>>;
};

export type UserAccount = {
  __typename?: 'UserAccount';
  id: Scalars['ID'];
  givenName: Scalars['String'];
  familyName: Scalars['String'];
  emailAddress: Scalars['String'];
  featureFlags?: Maybe<Array<Maybe<FeatureFlag>>>;
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  id: Scalars['ID'];
  value: Scalars['String'];
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
  FeatureFlagInput: FeatureFlagInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  UserAccountInput: UserAccountInput;
  Mutation: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Query: ResolverTypeWrapper<{}>;
  UserAccount: ResolverTypeWrapper<UserAccount>;
  FeatureFlag: ResolverTypeWrapper<FeatureFlag>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  FeatureFlagInput: FeatureFlagInput;
  String: Scalars['String'];
  UserAccountInput: UserAccountInput;
  Mutation: {};
  ID: Scalars['ID'];
  Query: {};
  UserAccount: UserAccount;
  FeatureFlag: FeatureFlag;
  Boolean: Scalars['Boolean'];
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  updateFeatureFlags?: Resolver<Maybe<Array<Maybe<ResolversTypes['FeatureFlag']>>>, ParentType, ContextType, RequireFields<MutationUpdateFeatureFlagsArgs, 'userAccountIds' | 'input'>>;
  updateUserAccounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserAccount']>>>, ParentType, ContextType, RequireFields<MutationUpdateUserAccountsArgs, 'featureFlagId' | 'input'>>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  userAccounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserAccount']>>>, ParentType, ContextType>;
}>;

export type UserAccountResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserAccount']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featureFlags?: Resolver<Maybe<Array<Maybe<ResolversTypes['FeatureFlag']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UserAccount?: UserAccountResolvers<ContextType>;
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
