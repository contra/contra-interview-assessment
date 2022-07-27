import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  createProject: Project;
  destroyProject?: Maybe<Project>;
  destroyUser?: Maybe<User>;
  registerUser: User;
};


export type MutationCreateProjectArgs = {
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDestroyProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationDestroyUserArgs = {
  userId: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  bio?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  location?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  profileTitle?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  verifiedAccount?: InputMaybe<Scalars['Boolean']>;
};

export type Project = {
  __typename?: 'Project';
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  projectId: Scalars['ID'];
  title: Scalars['String'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  getAllProjects: Array<Project>;
  getAllUsers: Array<User>;
  getProjectById: Project;
  getProjectsByUserId: Array<Project>;
  getUser: User;
};


export type QueryGetProjectByIdArgs = {
  projectId: Scalars['String'];
};


export type QueryGetProjectsByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  profileTitle?: Maybe<Scalars['String']>;
  projects?: Maybe<Array<Project>>;
  tags?: Maybe<Array<Scalars['String']>>;
  userId: Scalars['ID'];
  verifiedAccount: Scalars['Boolean'];
};

export type CreateProjectMutationVariables = Exact<{
  imageUrl: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', projectId: string } };

export type DestroyProjectMutationVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type DestroyProjectMutation = { __typename?: 'Mutation', destroyProject?: { __typename?: 'Project', projectId: string } | null };

export type GetProjectsByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetProjectsByUserIdQuery = { __typename?: 'Query', getProjectsByUserId: Array<{ __typename?: 'Project', projectId: string, title: string, description: string, imageUrl: string }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', userId: string, firstName: string, lastName: string, profileTitle?: string | null, imageUrl?: string | null, tags?: Array<string> | null, bio?: string | null, verifiedAccount: boolean, location?: string | null } };


export const CreateProjectDocument = gql`
    mutation CreateProject($imageUrl: String!, $description: String!, $title: String!, $userId: String!) {
  createProject(
    imageUrl: $imageUrl
    description: $description
    title: $title
    userId: $userId
  ) {
    projectId
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      imageUrl: // value for 'imageUrl'
 *      description: // value for 'description'
 *      title: // value for 'title'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const DestroyProjectDocument = gql`
    mutation DestroyProject($projectId: String!) {
  destroyProject(projectId: $projectId) {
    projectId
  }
}
    `;
export type DestroyProjectMutationFn = Apollo.MutationFunction<DestroyProjectMutation, DestroyProjectMutationVariables>;

/**
 * __useDestroyProjectMutation__
 *
 * To run a mutation, you first call `useDestroyProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyProjectMutation, { data, loading, error }] = useDestroyProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDestroyProjectMutation(baseOptions?: Apollo.MutationHookOptions<DestroyProjectMutation, DestroyProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DestroyProjectMutation, DestroyProjectMutationVariables>(DestroyProjectDocument, options);
      }
export type DestroyProjectMutationHookResult = ReturnType<typeof useDestroyProjectMutation>;
export type DestroyProjectMutationResult = Apollo.MutationResult<DestroyProjectMutation>;
export type DestroyProjectMutationOptions = Apollo.BaseMutationOptions<DestroyProjectMutation, DestroyProjectMutationVariables>;
export const GetProjectsByUserIdDocument = gql`
    query GetProjectsByUserId($userId: String!) {
  getProjectsByUserId(userId: $userId) {
    projectId
    title
    description
    imageUrl
  }
}
    `;

/**
 * __useGetProjectsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetProjectsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetProjectsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>(GetProjectsByUserIdDocument, options);
      }
export function useGetProjectsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>(GetProjectsByUserIdDocument, options);
        }
export type GetProjectsByUserIdQueryHookResult = ReturnType<typeof useGetProjectsByUserIdQuery>;
export type GetProjectsByUserIdLazyQueryHookResult = ReturnType<typeof useGetProjectsByUserIdLazyQuery>;
export type GetProjectsByUserIdQueryResult = Apollo.QueryResult<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: String!) {
  getUser(userId: $userId) {
    userId
    firstName
    lastName
    profileTitle
    imageUrl
    tags
    bio
    verifiedAccount
    location
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;