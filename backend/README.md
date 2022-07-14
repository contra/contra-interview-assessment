# Contra Backend Technical Asessment

## Requirements
At Contra, feature flags enable our team to run experiments, ship to production frequently, and control the rollout of new features for our users. If you're not familiar with feature flags, here's an article that explains the concept..

Assume the following about feature flags:

The same user cannot receive different values for the same feature flag
Different users can be targeted with the same feature flag
A feature flag can have boolean or multivariate values
Your task is to build the backend for a lightweight feature flag management service by completing the following backend tasks.

Backend
[ ] Build a GraphQL API that:
[ ] Exposes a GraphQL Mutation to target one or more users with a specific feature flag
[ ] Exposes a GraphQL Query that returns all users and their associated feature flags
[ ] Exposes a GraphQL Mutation to change the value of a feature flag for a specific user

Note: To keep it simple, you don't need to build API functionality to create or delete feature flags or users. Assume that you can manually seed feature flags and users in the database, once you've designed the database schema to support.

## Install Backend Project Dependencies
For your convenience, this project is separated into backend and frontend sub-projects, each with their own dependencies. Now that yarn is installed locally, you'll want to cd into each each sub-project and run yarn to install dependencies.

$ cd backend
$ yarn

## Start the Backend
We've provided a fresh NodeJS/Fastify/TypeScript/GraphQL/PostgreSQL project out of the box.

The project expects a valid database connection string passed to the POSTGRES_CONNECTION_STRING environment variable to start. We recommend using Render, which provides a free hosted PostgreSQL instance in just a few clicks. Have a look at the Render setup instructions for more detail. That said, you're welcome to use another database service of your choice, run a local PostgreSQL Docker container, etc. Regardless, once you've configured a database instance, set the POSTGRES_CONNECTION_STRING environment variable:

$ export POSTGRES_CONNECTION_STRING='YOUR_PG_DATABASE_CONNECTION_STRING'
Once you've installed the correct NodeJS version with nvm, installed the yarn package manager, run yarn in the backend directory to install dependencies, and set the POSTGRES_CONNECTION_STRING environment variable, you're all set to start coding.

To boot up the backend, just run

$ yarn dev
and the application should come alive at localhost:8080/graphql

This project comes with Apollo Explorer, a handy GUI to execute operations your GraphQL server. A hello query comes ready for you out of the box -- try it out:

{
  hello
}
If successful, you'll get back the following response:

{
  "data": {
    "hello": "world"
  }
}

A word on Databases, Slonik, and Migrations
We've provided the PostgreSQL client slonik out of the box for you to use, though you're welcome to replace it with any PostgreSQL client you'd like. The same goes for @slonik/migrator — it is there to help you with writing and managing database migrations, but feel free to use another tool if you see fit. Regardless of what technology you use, make sure to commit all migration artifacts with your submission, just as you would building for production.

If you chose to adopt something other than slonik, you'll want to update createFastifyServer to accept a database connection of your choosing, and include it in the GraphQL resolver context when instantiating ApolloServer.

If you choose to stay with slonik and @slonik/migrator, the following is relevant to you:

An instance of DatabasePoolType is exposed to your GraphQL resolvers through the resolver context, like so:
import { QueryResolvers } from "../../../generated/types";
import { sql } from "slonik";

export const resolve: QueryResolvers["hello"] = async (
  _parent,
  _args,
  context
) => {
  const { pool } = context;
  const result = await pool.one<{ phrase: string }>(
    sql`SELECT 'world' as phrase;`
  );

  return result.phrase;
};

All migration activity will run against the database instance you connected through the POSTGRES_CONNECTION_STRING environment variable. Make sure that yarn migrate prefixes all commands. Here's an example:
$ yarn migrate create --name user_account.sql
$ yarn migrate up
$ yarn migrate down
A sample migration for a user_account table has provided for your convenience.