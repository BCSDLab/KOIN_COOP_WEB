# Install and Start Development Server

Clone our repository with this command.

```sh
git clone https://github.com/BCSDLab/KOIN_COOP_WEB
cd KOIN_COOP_WEB
```

Install dependency package and Start the development server!

```sh
yarn
yarn start
```

> We are using [Yarn Berry (Yarn 3)](https://yarnpkg.com/getting-started/install). Do not use `npm install` command. Use `yarn` to install dependencies.

## Development flow

- Set up your development environment.
- Create an issue for the development task you are responsible for.
- Make changes from the appropriate branch.
- Develop your page following our [code convention](https://github.com/airbnb/javascript).
- Ensure the code passes `yarn lint` before you commit.
- When writing commit messages, follow our [commit message guide](./commit-message-convention.md).

## Branch strategy

We are following [git-flow transformation strategy](https://techblog.woowahan.com/2553/).

- main
  - Branch for production server
  - We are using main branch instead of production branch
  - We don't use version tag
- feature
  - Make branch name like `feature/#1/description`. Number means github issue number
- develop
  - Branch for development server
  - If you want to publish this version, Make a Pull Request to main branch
- hotfix
  - Branch for production error
  - Make a Pull Request to main branch
