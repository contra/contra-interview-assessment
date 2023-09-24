import type { JsonScalar } from '../ResolverContextType';
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { ResolverContext } from '../ResolverContextType';
import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: JsonScalar;
  Timestamp: string;
};

export type Flag = {
  __typename?: 'Flag';
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: FlagTypeEnum;
  updatedAt: Scalars['Timestamp'];
  value: Scalars['JSON'];
};

export enum FlagTypeEnum {
  Boolean = 'boolean',
  Multi = 'multi'
}


export type Mutation = {
  __typename?: 'Mutation';
  targetUsers: TargetUsersResult;
  updateFlagForUser: UpdateFlagForUserResult;
};


export type MutationTargetUsersArgs = {
  input: TargetUsersInput;
};


export type MutationUpdateFlagForUserArgs = {
  input: UpdateFlagForUserInput;
};

export type Query = {
  __typename?: 'Query';
  flag: Flag;
  flags: Array<Flag>;
  user: User;
  users: Array<User>;
};


export type QueryFlagArgs = {
  flagId: Scalars['ID'];
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};

export type TargetUsersInput = {
  flagId: Scalars['ID'];
  usersIds: Array<Scalars['ID']>;
  value?: Maybe<Scalars['JSON']>;
};

export type TargetUsersResult = {
  __typename?: 'TargetUsersResult';
  success: Scalars['Boolean'];
};


export type UpdateFlagForUserInput = {
  flagId: Scalars['ID'];
  userId: Scalars['ID'];
  value: Scalars['JSON'];
};

export type UpdateFlagForUserResult = {
  __typename?: 'UpdateFlagForUserResult';
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Timestamp'];
  emailAddress: Scalars['String'];
  familyName: Scalars['String'];
  flags: Array<Flag>;
  givenName: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['Timestamp'];
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
  Flag: ResolverTypeWrapper<Flag>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  FlagTypeEnum: FlagTypeEnum;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  TargetUsersInput: TargetUsersInput;
  TargetUsersResult: ResolverTypeWrapper<TargetUsersResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  UpdateFlagForUserInput: UpdateFlagForUserInput;
  UpdateFlagForUserResult: ResolverTypeWrapper<UpdateFlagForUserResult>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Flag: Flag;
  String: Scalars['String'];
  ID: Scalars['ID'];
  JSON: Scalars['JSON'];
  Mutation: {};
  Query: {};
  TargetUsersInput: TargetUsersInput;
  TargetUsersResult: TargetUsersResult;
  Boolean: Scalars['Boolean'];
  Timestamp: Scalars['Timestamp'];
  UpdateFlagForUserInput: UpdateFlagForUserInput;
  UpdateFlagForUserResult: UpdateFlagForUserResult;
  User: User;
}>;

export type FlagResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Flag']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['FlagTypeEnum'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  targetUsers?: Resolver<ResolversTypes['TargetUsersResult'], ParentType, ContextType, RequireFields<MutationTargetUsersArgs, 'input'>>;
  updateFlagForUser?: Resolver<ResolversTypes['UpdateFlagForUserResult'], ParentType, ContextType, RequireFields<MutationUpdateFlagForUserArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  flag?: Resolver<ResolversTypes['Flag'], ParentType, ContextType, RequireFields<QueryFlagArgs, 'flagId'>>;
  flags?: Resolver<Array<ResolversTypes['Flag']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type TargetUsersResultResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['TargetUsersResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type UpdateFlagForUserResultResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['UpdateFlagForUserResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ResolverContext, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  emailAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  familyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flags?: Resolver<Array<ResolversTypes['Flag']>, ParentType, ContextType>;
  givenName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  Flag?: FlagResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TargetUsersResult?: TargetUsersResultResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  UpdateFlagForUserResult?: UpdateFlagForUserResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ResolverContext> = Resolvers<ContextType>;

export type FlagDataFragment = (
  { __typename?: 'Flag' }
  & Pick<Flag, 'id' | 'name' | 'description' | 'type' | 'value' | 'createdAt' | 'updatedAt'>
);

export type UserDataFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'givenName' | 'familyName' | 'emailAddress' | 'createdAt' | 'updatedAt'>
);

export type UserDataWithFlagFragment = (
  { __typename?: 'User' }
  & { flags: Array<(
    { __typename?: 'Flag' }
    & FlagDataFragment
  )> }
  & UserDataFragment
);

export type TargetUsersMutationVariables = Exact<{
  input: TargetUsersInput;
}>;


export type TargetUsersMutation = (
  { __typename?: 'Mutation' }
  & { targetUsers: (
    { __typename?: 'TargetUsersResult' }
    & Pick<TargetUsersResult, 'success'>
  ) }
);

export type UpdateFlagForUserMutationVariables = Exact<{
  input: UpdateFlagForUserInput;
}>;


export type UpdateFlagForUserMutation = (
  { __typename?: 'Mutation' }
  & { updateFlagForUser: (
    { __typename?: 'UpdateFlagForUserResult' }
    & Pick<UpdateFlagForUserResult, 'success'>
  ) }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & UserDataFragment
  )> }
);

export type GetUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & UserDataFragment
  ) }
);

export type GetUsersWithFlagQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersWithFlagQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & UserDataWithFlagFragment
  )> }
);

export type GetUserWithFlagQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserWithFlagQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & UserDataWithFlagFragment
  ) }
);

export type GetFlagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFlagsQuery = (
  { __typename?: 'Query' }
  & { flags: Array<(
    { __typename?: 'Flag' }
    & FlagDataFragment
  )> }
);

export type GetFlagQueryVariables = Exact<{
  flagId: Scalars['ID'];
}>;


export type GetFlagQuery = (
  { __typename?: 'Query' }
  & { flag: (
    { __typename?: 'Flag' }
    & FlagDataFragment
  ) }
);

export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  id
  givenName
  familyName
  emailAddress
  createdAt
  updatedAt
}
    `;
export const FlagDataFragmentDoc = gql`
    fragment FlagData on Flag {
  id
  name
  description
  type
  value
  createdAt
  updatedAt
}
    `;
export const UserDataWithFlagFragmentDoc = gql`
    fragment UserDataWithFlag on User {
  ...UserData
  flags {
    ...FlagData
  }
}
    ${UserDataFragmentDoc}
${FlagDataFragmentDoc}`;
export const TargetUsersDocument = gql`
    mutation targetUsers($input: TargetUsersInput!) {
  targetUsers(input: $input) {
    success
  }
}
    `;
export const UpdateFlagForUserDocument = gql`
    mutation updateFlagForUser($input: UpdateFlagForUserInput!) {
  updateFlagForUser(input: $input) {
    success
  }
}
    `;
export const GetUsersDocument = gql`
    query getUsers {
  users {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export const GetUserDocument = gql`
    query getUser($userId: ID!) {
  user(userId: $userId) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export const GetUsersWithFlagDocument = gql`
    query getUsersWithFlag {
  users {
    ...UserDataWithFlag
  }
}
    ${UserDataWithFlagFragmentDoc}`;
export const GetUserWithFlagDocument = gql`
    query getUserWithFlag($userId: ID!) {
  user(userId: $userId) {
    ...UserDataWithFlag
  }
}
    ${UserDataWithFlagFragmentDoc}`;
export const GetFlagsDocument = gql`
    query getFlags {
  flags {
    ...FlagData
  }
}
    ${FlagDataFragmentDoc}`;
export const GetFlagDocument = gql`
    query getFlag($flagId: ID!) {
  flag(flagId: $flagId) {
    ...FlagData
  }
}
    ${FlagDataFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    targetUsers(variables: TargetUsersMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TargetUsersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TargetUsersMutation>(TargetUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'targetUsers', 'mutation');
    },
    updateFlagForUser(variables: UpdateFlagForUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateFlagForUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateFlagForUserMutation>(UpdateFlagForUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateFlagForUser', 'mutation');
    },
    getUsers(variables?: GetUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>(GetUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUsers', 'query');
    },
    getUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUser', 'query');
    },
    getUsersWithFlag(variables?: GetUsersWithFlagQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersWithFlagQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersWithFlagQuery>(GetUsersWithFlagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUsersWithFlag', 'query');
    },
    getUserWithFlag(variables: GetUserWithFlagQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserWithFlagQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserWithFlagQuery>(GetUserWithFlagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserWithFlag', 'query');
    },
    getFlags(variables?: GetFlagsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetFlagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFlagsQuery>(GetFlagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFlags', 'query');
    },
    getFlag(variables: GetFlagQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetFlagQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFlagQuery>(GetFlagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFlag', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;