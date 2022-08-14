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
  flagKey: Scalars['String'];
  flagValue: Scalars['String'];
  id: Scalars['ID'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type FeatureFlagData = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<SetUserResponse>;
  sampleMutation: Scalars['String'];
  setUserFeatureFlag?: Maybe<UpdateResponse>;
  setUsersBasedOnFeatureFlag?: Maybe<SetUserResponse>;
};


export type MutationCreateUserArgs = {
  userData: UserData;
};


export type MutationSetUserFeatureFlagArgs = {
  flagData: FeatureFlagData;
  userEmail: Scalars['String'];
};


export type MutationSetUsersBasedOnFeatureFlagArgs = {
  flagKey: Scalars['String'];
  updateData: SetUserData;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  hello: Scalars['String'];
};

export type SetFeatureFlagResponse = {
  __typename?: 'SetFeatureFlagResponse';
  rowCount: Scalars['Int'];
};

export type SetUserData = {
  familyName?: Maybe<Scalars['String']>;
  flagValue?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
};

export type SetUserResponse = {
  __typename?: 'SetUserResponse';
  rowCount: Scalars['Int'];
};

export type UpdateResponse = {
  __typename?: 'UpdateResponse';
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  familyName: Scalars['String'];
  flags?: Maybe<Array<Maybe<FeatureFlag>>>;
  givenName: Scalars['String'];
  id: Scalars['ID'];
};

export type UserData = {
  email: Scalars['String'];
  familyName: Scalars['String'];
  givenName: Scalars['String'];
};

export type UserQueryInput = {
  email_address?: Maybe<Scalars['String']>;
  family_name?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
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
  FeatureFlagData: FeatureFlagData;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SetFeatureFlagResponse: ResolverTypeWrapper<SetFeatureFlagResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  SetUserData: SetUserData;
  SetUserResponse: ResolverTypeWrapper<SetUserResponse>;
  UpdateResponse: ResolverTypeWrapper<UpdateResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  User: ResolverTypeWrapper<User>;
  UserData: UserData;
  UserQueryInput: UserQueryInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  FeatureFlag: FeatureFlag;
  String: Scalars['String'];
  ID: Scalars['ID'];
  FeatureFlagData: FeatureFlagData;
  Mutation: {};
  Query: {};
  SetFeatureFlagResponse: SetFeatureFlagResponse;
  Int: Scalars['Int'];
  SetUserData: SetUserData;
  SetUserResponse: SetUserResponse;
  UpdateResponse: UpdateResponse;
  Boolean: Scalars['Boolean'];
  User: User;
  UserData: UserData;
  UserQueryInput: UserQueryInput;
}>;

export type FeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlag']> = ResolversObject<{
  flagKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flagValue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<Maybe<ResolversTypes['SetUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userData'>>;
  sampleMutation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  setUserFeatureFlag?: Resolver<Maybe<ResolversTypes['UpdateResponse']>, ParentType, ContextType, RequireFields<MutationSetUserFeatureFlagArgs, 'flagData' | 'userEmail'>>;
  setUsersBasedOnFeatureFlag?: Resolver<Maybe<ResolversTypes['SetUserResponse']>, ParentType, ContextType, RequireFields<MutationSetUsersBasedOnFeatureFlagArgs, 'flagKey' | 'updateData'>>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  getAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type SetFeatureFlagResponseResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['SetFeatureFlagResponse']> = ResolversObject<{
  rowCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetUserResponseResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['SetUserResponse']> = ResolversObject<{
  rowCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateResponseResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UpdateResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flags?: Resolver<Maybe<Array<Maybe<ResolversTypes['FeatureFlag']>>>, ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SetFeatureFlagResponse?: SetFeatureFlagResponseResolvers<ContextType>;
  SetUserResponse?: SetUserResponseResolvers<ContextType>;
  UpdateResponse?: UpdateResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
