# Solution Walkthrough

## Database

### What is Prisma?

Prisma is a **next-generation ORM** that consists of these tools:

- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Auto-generated and type-safe query builder for Node.js & TypeScript
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Declarative data modeling & migration system
- [**Prisma Studio**](https://github.com/prisma/studio): GUI to view and edit data in your database

### Schema

The schema has 3 main tables; `User`, `FeatureFlag` and `UserFlag`

- `User`: stores users main details and has a many-to-many relation with `FeatureFlag`.
- `FeatureFlag`: stores feature flag id, name, description and type.
- `UserFlag`: represent the relation between a `User` and `FeatureFlag` with a **value**
  field of type JSON

---

## GraphQL

### Mutaitons

- `SetUsersFeatureFlag`: a mutation to set a feature flag with a value for one or more users.
- `UpdateUserFlag`: a mutation to change the value of a feature flag for a specific user.

### Query

- `getUsers`: a query to fetch all users and their associated feature flags.
- `GetFeatureFlags`: a query to fetch all feature flags in the database

### Scalars

I used [`graphql-json-type`](https://github.com/taion/graphql-type-json) package to handle JSON types in the schema. This allow us to represent any JSON-serializable value, including scalars, arrays, and objects.

---

## Repository Setup Instructions

### Install NVM and Yarn

[Follow the nvm installation instructions](https://github.com/nvm-sh/nvm)

Next, you'll want to install the version of Node this repository uses -- `v16.11`

```sh
$ nvm install 16.11
$ cd contra-interview-assessment
$ nvm use
```

- Install Yarn: [Follow the yarn setup instructions](https://yarnpkg.com/getting-started/install)

### Install Project Dependencies

Now that `yarn` is installed locally, you'll want to run `yarn` to install dependencies.

```
$ yarn
```

### Start the Backend

I used [Render](https://render.com), which provides a free hosted PostgreSQL instance in just a few clicks.

1. Configure your database instance by setting `POSTGRES_CONNECTION_STRING` in the `.env` file with the connection string of your database.

2. run Prisma migrations using:

```sh
$ yarn run migrate dev
```

3. To seed your database, run

```sh
$ yarn run seed
```

4. To boot up the backend, just run

```sh
$ yarn run dev
```

and the application should come alive at `localhost:8080/graphql`. This project comes with Apollo Explorer, a handy GUI to execute operations your GraphQL server.
