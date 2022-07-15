# Contra Frontend Technical Asessment

## Requirements

Modals are a common UI pattern in web applications, but implementing them in a correct, accessible, and performant way is an exercise in frontend engineering at its finest. Your task is to implement a lightweight, foundational Modal component in React from scratch.

You'll be evaluated on how well your implementation accounts for this (nonexhaustive) list of considerations:

- Focus Management
- Background scroll-locking
- Tab navigation
- React portals
- Multi-modal environment (i.e. stacking)
- Accessibility
- Mobile

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

```sh
$ yarn
```

### Start the Frontend

We've provided a fresh NextJS project out of the box. Once you've installed the correct NodeJS version with `nvm`, installed the `yarn` package manager, and run `yarn` in the `frontend` directory to install dependencies, you're all set to start coding.

To boot up the frontend, just run

```sh
$ yarn dev
```

and the application should come alive at `localhost:3000`
