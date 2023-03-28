# Contra Frontend Technical Assessment

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

## Assessment
### Libraries I used
- focus-trap-react to help keep focus in currently opened Modal
- body-scroll-lock to help lock background scroll when Modal is open

### Liberties I took
- Outside click can be configured to either dismiss the Modal or not
- Option to make Modal fullscreen or not
- At very small screen sizes (*450px and below*), modal becomes fullscreen. This is a media query addition for the demo page and is not baked into the Modal implementation itself

### Improvements provided enough time
- **Styling** will be migrated to a SASS model to help with **encapulation** and **reuse**.
- **Storybook** will be added to provide more flexible and variable **testing**.
- Proper **snapshot testing** will be added for varying states.
- **Extensibility** will be implemented to take advantage of **custom styling** as well as **placement of segments like header and footer**. It will however remain foundational if you do not extend it.
- Look for more ways to **clean** the codebase