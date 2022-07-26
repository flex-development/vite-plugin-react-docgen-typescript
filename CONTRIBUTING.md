# Contributing Guide

This document aims to describe the workflows and rules used for developing this
project. This includes, but is not limited to:

- how to contribute code (coding standards, testing, documenting source code)
- how pull requests are handled
- how to file bug reports

## Getting Started

Follow the steps below to setup your local development environment:

1. Clone repository

   ```sh
   git clone https://github.com/flex-development/vite-plugin-react-docgen-typescript
   cd vite-plugin-react-docgen-typescript
   ```

2. Install binaries with [Homebrew][1]

   ```sh
   brew bundle --file ./Brewfile
   ```

3. Set node version

   ```sh
   nvm use
   ```

4. [Configure commit signing][2]

5. Update `~/.gitconfig`

   ```sh
   git config --global color.ui true
   git config --global commit.gpgsign true
   git config --global core.ignorecase false
   git config --global pull.rebase true
   git config --global user.email <email>
   git config --global user.name <name>
   git config --global user.username <username>
   ```

6. Install dependencies

   ```sh
   yarn
   ```

   **Note**: This project uses [Yarn 2][3]. Consult [`.yarnrc.yml`](.yarnrc.yml)
   for an overview of configuration options and required environment variables.
   Furthermore, if you already have a global Yarn configuration, or any `YARN_*`
   environment variables set, an error will be thrown if any settings conflict
   with the project's Yarn configuration, or the Yarn 2 API. Missing environment
   variables will also yield an error.

7. [ZSH](docs/ZSH.md) setup

8. Update `$ZDOTDIR/.zprofile`:

   ```sh
   # PATH
   # 1. local node_modules
   [ -d $PWD/node_modules/.bin ] && export PATH=$PWD/node_modules/.bin:$PATH
   
   # DOTENV ZSH PLUGIN
   # - https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/dotenv
   export ZSH_DOTENV_FILE=.env.zsh
   
   # GIT
   # - https://gist.github.com/troyfontaine/18c9146295168ee9ca2b30c00bd1b41e
   export GIT_USERNAME=$(git config user.username)
   
   # NVM
   # - https://github.com/nvm-sh/nvm
   export NVM_DIR=$HOME/.nvm
   
   # ---------------------------------------------------------------------------
   
   # LOAD ENVIRONMENT VARIABLES IN CURRENT WORKING DIRECTORY
   # 1. $GITHUB_WORKSPACE
   [ -d $PWD/.git ] && export GITHUB_WORKSPACE=$(git rev-parse --show-toplevel)
   ```

9. Load `dotenv` plugin via `$ZDOTDIR/.zshrc`:

   ```zsh
   plugins=(dotenv)
   ```

10. Reload shell

    ```sh
    exec $SHELL
    ```

### Environment Variables

#### Development

| name                |
| ------------------- |
| `GIT_USERNAME`      |
| `NODE_ENV`          |
| `NODE_NO_WARNINGS`  |
| `NODE_OPTIONS`      |
| `PROJECT_CWD`**\*** |
| `TS_NODE_PROJECT`   |
| `ZSH_DOTENV_FILE`   |

**\*** Provided by [Yarn 2 scripts and binaries][4]\

#### GitHub Actions

Variables are prefixed by `secrets.` in [workflow](.github/workflows/) files.

### Git Config

The examples in this guide contain references to custom Git aliases.

See [`.github/.gitconfig`](.github/.gitconfig) for an exhaustive list.

## Contributing Code

[Husky][5] is used to locally enforce coding and commit message standards, as
well as run test suites pre-push.

Any code merged into the [development and production branches](#branching-model)
must confront the following criteria:

- changes should be discussed prior to implementation
- changes have been tested properly
- changes should include documentation updates if applicable
- changes have an associated ticket and pull request

### Branching Model

- Development: `next`
- Production: `main`

### Branch Prefixes

When creating a new branch, the name should match the following format:

```zsh
[prefix]/<github-username>/<issue-number>-<branch_name>
 │        │                 │              │
 │        │                 │              └─⫸ a short, memorable name (possibly the future PR title)
 │        │                 │
 │        │                 └─⫸ check github issue
 │        │
 │        └─⫸ your github username
 │
 └─⫸ bugfix|feat|hotfix|release|support
```

For example:

```zsh
git chbf $GIT_USERNAME/4-blog-layout
```

will create a new branch titled `feat/<your-github-username>/4-blog-layout`.

### Commit Messages

This project follows [Conventional Commit][6] standards and uses [commitlint][7]
to enforce those standards.

This means every commit must conform to the following format:

```zsh
<type>[optional scope][!]: <description>
 │     │               │    │
 │     │               │    │
 │     │               │    └─⫸ summary in present tense (lowercase without punctuation)
 │     │               │
 │     │               └─⫸ optional breaking change flag
 │     │
 │     └─⫸ see commitlintrc.ts
 │
 └─⫸ build|ci|chore|docs|feat|fix|perf|refactor|revert|style|test|wip

[optional body]

[optional footer(s)]
```

`<type>` must be one of the following values:

- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI/CD configuration files and scripts
- `chore`: Changes that don't impact external users
- `docs`: Documentation only changes
- `feat`: New features
- `fix`: Bug fixes
- `perf`: Performance improvements
- `refactor`: Code improvements
- `revert`: Revert past changes
- `style`: Changes that do not affect the meaning of the code
- `test`: Adding missing tests or correcting existing tests
- `wip`: Working on changes, but you need to go to bed :wink:

e.g:

- `git docs 'update contributing guide'` -> `docs: update contributing guide`
- `git ac 'refactor(components)!: Graph'` -> `refactor(components)!: Graph`

See [`.commitlintrc.ts`](.commitlintrc.ts) for a review of commit rules.

### Code Style

[Prettier][8] is used to format code and [ESLint][9] to lint files.

#### ESLint Configuration

- [`.eslintrc.base.cjs`](.eslintrc.base.cjs)
- [`.eslintrc.cjs`](.eslintrc.cjs)
- [`.eslintrc.web.cjs`](.eslintrc.web.cjs)
- [`.eslintignore`](.eslintignore)

#### Prettier Configuration

- [`.prettierrc.json`](.prettierrc.json)
- [`.prettierignore`](.prettierignore)

### Making Changes

Source code is located in [`src`](src) directory.

### Documentation

- JavaScript & TypeScript: [JSDoc][10]; linted with [`eslint-plugin-jsdoc`][11]

Before making a pull request, be sure your code is well documented, as it will
be part of your code review.

### Testing

This project uses [Vitest][12] to run tests.

[Husky](#contributing-code) is configured to run tests against changed files.

Be sure to use [`it.skip`][13] or [`it.todo`][14] where appropriate.

#### Running Tests

- `yarn test`
- `yarn test:cov`
  - See terminal for coverage output

### Getting Help

If you need help, make note of any issues in their respective files. Whenever
possible, create a test to reproduce the error. Make sure to label your issue as
`type:question` and `status:help-wanted`.

## Labels

This project uses a well-defined list of labels to organize issues and pull
requests. Most labels are scoped (i.e: `status:`).

A list of labels can be found in [`.github/labels.yml`](.github/labels.yml).

## Opening Issues

Before opening an issue please make sure, you have:

- read the documentation
- searched open issues for an existing issue with the same topic
- search closed issues for a solution or feedback

If you haven't found a related open issue, or feel that a closed issue should be
re-visited, open a new issue. A well-written issue has the following traits:

- follows an [issue template](.github/ISSUE_TEMPLATE)
- is [labeled](#labels) appropriately
- contains a well-written summary of the feature, bug, or problem statement
- contains a minimal, inlined code example (if applicable)
- includes links to related articles and documentation (if any)

## Pull Requests & Code Reviews

When you're ready to have your changes reviewed, open a pull request against the
`next` branch.

Every PR you open should:

- use [**this template**](.github/PULL_REQUEST_TEMPLATE.md)
- be assigned to yourself
- be [labeled](#labels) appropriately
- reference it's tracking issue

### Pull Request URL Format

```zsh
https://github.com/flex-development/vite-plugin-react-docgen-typescript/compare/next...<branch>
```

where `<branch>` is the name of the branch you'd like to merge into `next`.

### Code Reviews

All pull requests are subject to code reviews before being merged into `next`
and `main`. During code reviews, code-style and documentation will be reviewed.

If any changes are requested, those changes will need to be implemented and
approved before the pull request is merged.

## Merge Strategies

In every repository, the `create a merge commit` and `squash and merge` options
are enabled.

- **create a merge commit**: PR has multiple commits that are not grouped
- **squash and merge**: PR has one commit or a group of multiple commits

When merging, please make sure to use the following commit message format:

```txt
<type>[optional scope]: <pull-request-title> (#pull-request-n)
 │     │                │
 │     │                └─⫸ check your pull request
 │     │
 │     └─⫸ see .commitlintrc.ts
 │
 └─⫸ build|ci|chore|docs|feat|fix|merge|perf|refactor|release|revert|style|test|wip
```

e.g:

- `refactor(plugin): authentication #52`
- `perf(web): decrease page loading time #26`
- `release: @flex-development/vite-plugin-react-docgen-typescript@1.0.0 #13`

## Releasing

> Note: Package deployments and releases are executed via GitHub workflow. This
> is so invalid or malicious versions cannot be published without merging those
> changes into `next` first.

Before releasing, the following steps must be completed:

1. Schedule a code freeze
2. Create new `release/*` branch
   - where `*` is `<package.json#name-no-scope>@<new-version>`
     - e.g: `vite-plugin-react-docgen-typescript@1.1.0`
   - branch naming conventions **must be followed exactly**. the branch name is
     used to create distribution tags, locate drafted releases, and generate the
     correct workspace publish command
   - `git chbr vite-plugin-react-docgen-typescript@<new-version>`
3. Decide what version bump the release needs (major, minor, patch)
   - versioning
     - `yarn release` (determines [bumps based on commits][6])
     - `yarn release --first-release`
     - `yarn release --release-as major`
     - `yarn release --release-as minor`
     - `yarn release --release-as patch`
   - a new release will be drafted
4. Open new PR from `release/*` into `next`
   - PR title: `release: <package.json#name>@<new-version>`
     - e.g:
       `release: @flex-development/vite-plugin-react-docgen-typescript@1.1.0`
   - link all issues being released
   - after review, `squash and merge` PR
     - `release: @flex-development/vite-plugin-react-docgen-typescript@<new-version> (#pull-request-n)`
       - e.g:
         `release: @flex-development/vite-plugin-react-docgen-typescript@1.1.0 (#3)`
   - once PR is merged, deployment workflow will be triggered
   - PR reviewer should make sure workflow completes all jobs as expected
     - if successful, the workflow will:
       - wait for the [`ci`](.github/workflows/ci.yml) job to succeed
       - publish package to [GitHub Package Registry][15] and [NPM][16]
       - update production branch (merge branch `next` into `main`)
       - publish drafted release
   - PR reviewer should go through PR's linked issues and:
     - add `status:merged` label
     - add `status:released` label

[1]: https://brew.sh
[2]:
  https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification#gpg-commit-signature-verification
[3]: https://yarnpkg.com/getting-started
[4]: https://yarnpkg.com/advanced/lifecycle-scripts#environment-variables
[5]: https://github.com/typicode/husky
[6]: https://conventionalcommits.org
[7]: https://github.com/conventional-changelog/commitlint
[8]: https://prettier.io
[9]: https://eslint.org
[10]: https://jsdoc.app
[11]: https://github.com/gajus/eslint-plugin-jsdoc
[12]: https://vitest.dev
[13]: https://vitest.dev/api/#test-skip
[14]: https://vitest.dev/api/#test-todo
[15]: https://github.com/features/packages
[16]: https://npmjs.com
