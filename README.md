# vite-plugin-react-docgen-typescript

[![conventional commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/github/license/flex-development/loadenv.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/@flex-development/vite-plugin-react-docgen-typescript.svg)](https://npmjs.com/package/@flex-development/vite-plugin-react-docgen-typescript)

> A [react-docgen-typescript][3] plugin for [Vite][5].

## Install

```sh
yarn add -d @flex-development/vite-plugin-react-docgen-typescript
```

### GitHub Package Registry

To install from the GitHub Package Registry, setup a `.npmrc` or `.yarnrc.yml`
file to authenticate with the registry. A [Personal Access Token with at least
the `read:packages` scope][6] is required.

#### `.npmrc`

```utf-8
//npm.pkg.github.com/:_authToken=${GH_PAT}
@flex-development:registry=https://npm.pkg.github.com/
```

#### `.yarnrc.yml`

```yaml
npmRegistries:
  //npm.pkg.github.com:
    npmAlwaysAuth: true
    npmAuthToken: ${GH_PAT}

npmScopes:
  flex-development:
    npmRegistryServer: https://npm.pkg.github.com
```

## Usage

**TODO**: Update documentation.

## Why Vite Only?

**TODO**: Update documentation.

## Built With

- [magic-string][1]
- [micromatch][2]
- [react-docgen-typescript][3]
- [ts-dedent][4]

[1]: https://github.com/Rich-Harris/magic-string
[2]: https://github.com/micromatch/micromatch
[3]: https://github.com/styleguidist/react-docgen-typescript
[4]: https://github.com/tamino-martinius/node-ts-dedent
[5]: https://vitejs.dev
[6]:
  https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages#about-scopes-and-permissions-for-package-registries
