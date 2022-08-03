# Contra Backend Technical Asessment

## Requirements

At Contra, feature flags enable our team to run experiments, ship to production frequently, and control the rollout of new features for our users. If you're not familiar with feature flags, [here's an article that explains the concept.](https://featureflags.io/feature-flags/).

Assume the following about feature flags:

- The same user cannot receive different values for the same feature flag
- Different users can be targeted with the same feature flag
- A feature flag can have boolean or [multivariate values](https://featureflags.io/multivariate-feature-flags/)

**Your task is to build a lightweight feature flag management service by completing the following backend tasks.**

- [ ] Build a GraphQL API that:
  - [ ] Exposes a GraphQL Mutation to target one or more users with a specific feature flag
  - [ ] Exposes a GraphQL Query that returns all users and their associated feature flags
  - [ ] Exposes a GraphQL Mutation to change the value of a feature flag for a specific user

_Note: To keep it simple, you don't need to build API functionality to create or delete feature flags or users. Assume that you can manually seed feature flags and users in the database, once you've designed the database schema to support._

## Repository Setup Instructions

### Install NVM

The easiest way to install and manage versions Node.JS on your local machine is `nvm`.

[Follow the nvm installation instructions](https://github.com/nvm-sh/nvm)

Next, you'll want to install the version of Node this repository uses -- `v16.11`

```sh
$ nvm install 16.11
$ cd contra-interview-assessment
$ nvm use
```

If successful, you should get a message like this:

```sh
Now using node v16.11.0 (npm v7.11.2)
```

### Install Yarn

Next, you'll need to install the `yarn` package manager to install project dependencies and run scripts.

[Follow the yarn setup instructions](https://yarnpkg.com/getting-started/install)

### Install Project Dependencies

Now that `yarn` is installed locally, you'll want to run `yarn` to install dependencies.

```
$ yarn
```

### Start the Backend

We've provided a fresh NodeJS/Fastify/TypeScript/GraphQL/PostgreSQL project out of the box.

The project expects a valid database connection string passed to the `POSTGRES_CONNECTION_STRING` environment variable to start. We recommend using [Render](https://render.com), which provides a free hosted PostgreSQL instance in just a few clicks. [Have a look at the Render setup instructions](https://render.com/docs/databases#creating-a-database) for more detail. That said, you're welcome to use another database service of your choice, run a local PostgreSQL Docker container, etc. Regardless, once you've configured a database instance, set the `POSTGRES_CONNECTION_STRING` environment variable:

```sh
$ export POSTGRES_CONNECTION_STRING='YOUR_PG_DATABASE_CONNECTION_STRING'
```

Once you've installed the correct NodeJS version with `nvm`, installed the `yarn` package manager, run `yarn` in the `backend` directory to install dependencies, and set the `POSTGRES_CONNECTION_STRING` environment variable, you're all set to start coding.

To boot up the backend, just run

```sh
$ yarn dev
```

and the application should come alive at `localhost:8080/graphql`

This project comes with Apollo Explorer, a handy GUI to execute operations your GraphQL server. A `hello` query comes ready for you out of the box -- try it out:

```graphql
{
  hello
}
```

If successful, you'll get back the following response:

```json
{
  "data": {
    "hello": "world"
  }
}
```

### A word on Databases, Slonik, and Migrations

We've provided the PostgreSQL client [`slonik`](https://github.com/gajus/slonik) out of the box for you to use, though you're welcome to replace it with any PostgreSQL client you'd like. The same goes for [`@slonik/migrator`](https://github.com/mmkal/slonik-tools/tree/master/packages/migrator) &mdash; it is there to help you with writing and managing database migrations, but feel free to use another tool if you see fit. Regardless of what technology you use, make sure to commit all migration artifacts with your submission, just as you would building for production.

If you chose to adopt something other than `slonik`, you'll want to update `createFastifyServer` to accept a database connection of your choosing, and include it in the GraphQL resolver context when instantiating `ApolloServer`.

If you choose to stay with `slonik` and `@slonik/migrator`, the following is relevant to you:

- An instance of `DatabasePoolType` is exposed to your GraphQL resolvers through the resolver context, like so:

```ts
import { QueryResolvers } from '../../../generated/types';
import { sql } from 'slonik';

export const resolve: QueryResolvers['hello'] = async (
  _parent,
  _args,
  context,
) => {
  const { pool } = context;
  const result = await pool.one<{ phrase: string }>(
    sql`SELECT 'world' as phrase;`,
  );

  return result.phrase;
};
```

- All migration activity will run against the database instance you connected through the `POSTGRES_CONNECTION_STRING` environment variable. Make sure that `yarn migrate` prefixes all [commands](https://github.com/mmkal/slonik-tools/tree/master/packages/migrator#commands). Here's an example:

```sh
$ yarn migrate create --name user_account.sql
$ yarn migrate up
$ yarn migrate down
```

- A sample migration for a `user_account` table has provided for your convenience.


## Notes

To improve:

* Improve types. Remove pool:any

* lock rows for update

* improve data seeding