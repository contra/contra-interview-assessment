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

export type FeatureFlagAssignment = {
  __typename?: 'FeatureFlagAssignment';
  id: Scalars['ID'];
  value: Scalars['String'];
  valueType: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  givenName: Scalars['String'];
  familyName: Scalars['String'];
  emailAddress: Scalars['String'];
  featureFlagAssignments: Array<FeatureFlagAssignment>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum FeatureFlagType {
  Boolean = 'BOOLEAN',
  Multi = 'MULTI'
}

export type UserAssignment = {
  __typename?: 'UserAssignment';
  id: Scalars['ID'];
  value: Scalars['String'];
  valueType: Scalars['String'];
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  id: Scalars['ID'];
  type: FeatureFlagType;
  userAssignments: Array<UserAssignment>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type AddFeatureFlagInput = {
  id: Scalars['String'];
  type: FeatureFlagType;
};

export type AddUserInput = {
  givenName: Scalars['String'];
  familyName: Scalars['String'];
  emailAddress: Scalars['String'];
};

export type TargetSingleUserInput = {
  flagId: Scalars['ID'];
  userId: Scalars['ID'];
  value: Scalars['String'];
  valueType: Scalars['String'];
};

export type TargetMultiUserInput = {
  flagId: Scalars['String'];
  userIds: Array<Scalars['ID']>;
  value: Scalars['String'];
  valueType: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  featureFlags: Array<FeatureFlag>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFeatureFlag: FeatureFlag;
  addUser: User;
  targetSingleUser?: Maybe<User>;
  targetMultipleUsers: Array<User>;
};


export type MutationAddFeatureFlagArgs = {
  input: AddFeatureFlagInput;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationTargetSingleUserArgs = {
  input: TargetSingleUserInput;
};


export type MutationTargetMultipleUsersArgs = {
  input: TargetMultiUserInput;
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
  FeatureFlagAssignment: ResolverTypeWrapper<FeatureFlagAssignment>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  FeatureFlagType: FeatureFlagType;
  UserAssignment: ResolverTypeWrapper<UserAssignment>;
  FeatureFlag: ResolverTypeWrapper<FeatureFlag>;
  AddFeatureFlagInput: AddFeatureFlagInput;
  AddUserInput: AddUserInput;
  TargetSingleUserInput: TargetSingleUserInput;
  TargetMultiUserInput: TargetMultiUserInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  FeatureFlagAssignment: FeatureFlagAssignment;
  ID: Scalars['ID'];
  String: Scalars['String'];
  User: User;
  UserAssignment: UserAssignment;
  FeatureFlag: FeatureFlag;
  AddFeatureFlagInput: AddFeatureFlagInput;
  AddUserInput: AddUserInput;
  TargetSingleUserInput: TargetSingleUserInput;
  TargetMultiUserInput: TargetMultiUserInput;
  Query: {};
  Mutation: {};
  Boolean: Scalars['Boolean'];
}>;

export type FeatureFlagAssignmentResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlagAssignment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featureFlagAssignments?: Resolver<Array<ResolversTypes['FeatureFlagAssignment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserAssignmentResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserAssignment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['FeatureFlagType'], ParentType, ContextType>;
  userAssignments?: Resolver<Array<ResolversTypes['UserAssignment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  featureFlags?: Resolver<Array<ResolversTypes['FeatureFlag']>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  addFeatureFlag?: Resolver<ResolversTypes['FeatureFlag'], ParentType, ContextType, RequireFields<MutationAddFeatureFlagArgs, 'input'>>;
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'input'>>;
  targetSingleUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationTargetSingleUserArgs, 'input'>>;
  targetMultipleUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationTargetMultipleUsersArgs, 'input'>>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  FeatureFlagAssignment?: FeatureFlagAssignmentResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserAssignment?: UserAssignmentResolvers<ContextType>;
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
