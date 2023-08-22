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

export enum Feature_Flag_Value_Types {
  Boolean = 'BOOLEAN',
  String = 'STRING',
  Number = 'NUMBER',
  JsonArray = 'JSON_ARRAY',
  JsonObject = 'JSON_OBJECT'
}

export type FeatureFlagPossibleValues = {
  __typename?: 'FeatureFlagPossibleValues';
  type: Feature_Flag_Value_Types;
  values: Array<Scalars['String']>;
};

export type FeatureFlagValue = {
  __typename?: 'FeatureFlagValue';
  type: Feature_Flag_Value_Types;
  value: Scalars['String'];
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  id: Scalars['ID'];
  name: Scalars['String'];
  possibleValues: FeatureFlagPossibleValues;
  userAssociations?: Maybe<Array<UserFeatureFlagAssociation>>;
};

export type UserAccount = {
  __typename?: 'UserAccount';
  id: Scalars['ID'];
  givenName: Scalars['String'];
  familyName: Scalars['String'];
  emailAddress: Scalars['String'];
  featureFlagAssociations?: Maybe<Array<UserFeatureFlagAssociation>>;
};

export type UserFeatureFlagAssociation = {
  __typename?: 'UserFeatureFlagAssociation';
  user: UserAccount;
  featureFlag: FeatureFlag;
  value: FeatureFlagValue;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  userAccounts?: Maybe<Array<Maybe<UserAccount>>>;
};

export type AssignUsersToFeatureFlagReturnType = {
  __typename?: 'AssignUsersToFeatureFlagReturnType';
  userId: Scalars['ID'];
  value: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  sampleMutation: Scalars['String'];
  assignUsersToFeatureFlag: Array<Maybe<AssignUsersToFeatureFlagReturnType>>;
  updateUserFeatureFlagValue?: Maybe<Scalars['Boolean']>;
};


export type MutationAssignUsersToFeatureFlagArgs = {
  userAccountIds: Array<Scalars['ID']>;
  featureFlagId: Scalars['ID'];
  value: Scalars['String'];
};


export type MutationUpdateUserFeatureFlagValueArgs = {
  userAccountId: Scalars['ID'];
  featureFlagId: Scalars['ID'];
  newValue: Scalars['String'];
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
  FEATURE_FLAG_VALUE_TYPES: Feature_Flag_Value_Types;
  FeatureFlagPossibleValues: ResolverTypeWrapper<FeatureFlagPossibleValues>;
  String: ResolverTypeWrapper<Scalars['String']>;
  FeatureFlagValue: ResolverTypeWrapper<FeatureFlagValue>;
  FeatureFlag: ResolverTypeWrapper<FeatureFlag>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  UserAccount: ResolverTypeWrapper<UserAccount>;
  UserFeatureFlagAssociation: ResolverTypeWrapper<UserFeatureFlagAssociation>;
  Query: ResolverTypeWrapper<{}>;
  AssignUsersToFeatureFlagReturnType: ResolverTypeWrapper<AssignUsersToFeatureFlagReturnType>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  FeatureFlagPossibleValues: FeatureFlagPossibleValues;
  String: Scalars['String'];
  FeatureFlagValue: FeatureFlagValue;
  FeatureFlag: FeatureFlag;
  ID: Scalars['ID'];
  UserAccount: UserAccount;
  UserFeatureFlagAssociation: UserFeatureFlagAssociation;
  Query: {};
  AssignUsersToFeatureFlagReturnType: AssignUsersToFeatureFlagReturnType;
  Boolean: Scalars['Boolean'];
  Mutation: {};
}>;

export type FeatureFlagPossibleValuesResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlagPossibleValues']> = ResolversObject<{
  type?: Resolver<ResolversTypes['FEATURE_FLAG_VALUE_TYPES'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeatureFlagValueResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlagValue']> = ResolversObject<{
  type?: Resolver<ResolversTypes['FEATURE_FLAG_VALUE_TYPES'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeatureFlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['FeatureFlag']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  possibleValues?: Resolver<ResolversTypes['FeatureFlagPossibleValues'], ParentType, ContextType>;
  userAssociations?: Resolver<Maybe<Array<ResolversTypes['UserFeatureFlagAssociation']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserAccountResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserAccount']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featureFlagAssociations?: Resolver<Maybe<Array<ResolversTypes['UserFeatureFlagAssociation']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserFeatureFlagAssociationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UserFeatureFlagAssociation']> = ResolversObject<{
  user?: Resolver<ResolversTypes['UserAccount'], ParentType, ContextType>;
  featureFlag?: Resolver<ResolversTypes['FeatureFlag'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['FeatureFlagValue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userAccounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserAccount']>>>, ParentType, ContextType>;
}>;

export type AssignUsersToFeatureFlagReturnTypeResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['AssignUsersToFeatureFlagReturnType']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  sampleMutation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  assignUsersToFeatureFlag?: Resolver<Array<Maybe<ResolversTypes['AssignUsersToFeatureFlagReturnType']>>, ParentType, ContextType, RequireFields<MutationAssignUsersToFeatureFlagArgs, 'userAccountIds' | 'featureFlagId' | 'value'>>;
  updateUserFeatureFlagValue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateUserFeatureFlagValueArgs, 'userAccountId' | 'featureFlagId' | 'newValue'>>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  FeatureFlagPossibleValues?: FeatureFlagPossibleValuesResolvers<ContextType>;
  FeatureFlagValue?: FeatureFlagValueResolvers<ContextType>;
  FeatureFlag?: FeatureFlagResolvers<ContextType>;
  UserAccount?: UserAccountResolvers<ContextType>;
  UserFeatureFlagAssociation?: UserFeatureFlagAssociationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  AssignUsersToFeatureFlagReturnType?: AssignUsersToFeatureFlagReturnTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;
