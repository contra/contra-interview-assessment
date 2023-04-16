import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { User as UserModel } from '@prisma/client';
import type { ResolverContext } from '../ResolverContext';
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
  MultivariateScalar: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  targetWithFeatureFlag?: Maybe<Array<Maybe<User>>>;
  changeFeatureFlagValue?: Maybe<User>;
};


export type MutationTargetWithFeatureFlagArgs = {
  input: TargetMutationInput;
};


export type MutationChangeFeatureFlagValueArgs = {
  input: ChangeValueMutationInput;
};

export type TargetMutationInput = {
  name: Scalars['String'];
  value: Scalars['MultivariateScalar'];
  userIds: Array<Scalars['String']>;
};

export type ChangeValueMutationInput = {
  name: Scalars['String'];
  value: Scalars['MultivariateScalar'];
  userId: Scalars['String'];
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  name: Scalars['String'];
  value?: Maybe<Scalars['MultivariateScalar']>;
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String'];
  familyName: Scalars['String'];
  email: Scalars['String'];
  featureFlags?: Maybe<Array<Maybe<FeatureFlag>>>;
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
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
  TargetMutationInput: TargetMutationInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  ChangeValueMutationInput: ChangeValueMutationInput;
  FeatureFlag: ResolverTypeWrapper<FeatureFlag>;
  User: ResolverTypeWrapper<UserModel>;
  Query: ResolverTypeWrapper<{}>;
  MultivariateScalar: ResolverTypeWrapper<Scalars['MultivariateScalar']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Mutation: {};
  TargetMutationInput: TargetMutationInput;
  String: Scalars['String'];
  ChangeValueMutationInput: ChangeValueMutationInput;
  FeatureFlag: FeatureFlag;
  User: UserModel;
  Query: {};
  MultivariateScalar: Scalars['MultivariateScalar'];
  Boolean: Scalars['Boolean'];
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  targetWithFeatureFlag?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<MutationTargetWithFeatureFlagArgs, 'input'>>;
  changeFeatureFlagValue?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationChangeFeatureFlagValueArgs, 'input'>>;
}>;

export type FeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlag']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['MultivariateScalar']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featureFlags?: Resolver<Maybe<Array<Maybe<ResolversTypes['FeatureFlag']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
}>;

export interface MultivariateScalarScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MultivariateScalar'], any> {
  name: 'MultivariateScalar';
}

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  MultivariateScalar?: GraphQLScalarType;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
