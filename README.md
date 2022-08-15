# vite-plugin-react-docgen-typescript

[![conventional commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/github/license/flex-development/vite-plugin-react-docgen-typescript.svg)](LICENSE.md)
[![npm](https://img.shields.io/npm/v/@flex-development/vite-plugin-react-docgen-typescript.svg)](https://npmjs.com/package/@flex-development/vite-plugin-react-docgen-typescript)

> A [`react-docgen-typescript`][3] plugin for [Vite][5].\
> Parse modules for docgen information during development **and** at build time.

## Install

```sh
yarn add -D @flex-development/vite-plugin-react-docgen-typescript
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

### Git

For details on requesting a specific branch, commit, or tag, see
[npm-install][7] or [Git - Protocols | Yarn][8].

#### NPM

```sh
npm i -D flex-development/vite-plugin-react-docgen-typescript
```

#### Yarn

```sh
yarn add -D @flex-development/vite-plugin-react-docgen-typescript@flex-development/vite-plugin-react-docgen-typescript
```

## Usage

Options can be viewed [here](src/options.ts). Defaults (or equivalents, in the
case of `apply`, `componentNameResolver`, and `handler`) are shown below.

All [`react-docgen-typescript` options][9] are supported.

```typescript
/**
 * @file Vite Configuration
 * @module config/vite
 * @see https://vitejs.dev/config
 */

import docgen from '@flex-development/vite-plugin-react-docgen-typescript'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import type { ComponentDoc, PropItem } from 'react-docgen-typescript'
import type { SourceFile, Symbol } from 'typescript'
import * as vite from 'vite'

/**
 * Vite configuration options.
 *
 * @const {vite.UserConfigExport} config
 */
const config: vite.UserConfigExport = vite.defineConfig({
  plugins: [
    react(),
    docgen({
      apply: (config: vite.ConfigEnv, env: vite.ConfigEnv) => true,
      componentNameResolver: (exp: Symbol, source: SourceFile) => null,
      enforce: 'pre',
      exclude: ['**/**.stories.tsx'],
      handler: (doc: ComponentDoc) => doc,
      include: ['**/**.tsx'],
      propFilter: (p: PropItem) => !p.parent?.fileName.includes('node_modules'),
      savePropValueAsString: false,
      shouldExtractLiteralValuesFromEnum: false,
      shouldExtractValuesFromUnion: false,
      shouldIncludeExpression: false,
      shouldIncludePropTagMap: true,
      shouldRemoveUndefinedFromOptional: true,
      skipChildrenPropWithoutDoc: true,
      sourcemap: true,
      tsconfig: path.resolve('tsconfig.json')
    })
  ]
})

export default config
```

### Storybook

```typescript
/**
 * @file Storybook Main
 * @module storybook/main
 * @see https://storybook.js.org/docs/react/configure/overview
 */

import docgen from '@flex-development/vite-plugin-react-docgen-typescript'
import type { StorybookViteConfig } from '@storybook/builder-vite'
import path from 'node:path'
import type { PropItem } from 'react-docgen-typescript'
import * as vite from 'vite'

/**
 * Storybook configuration options.
 *
 * @const {StorybookViteConfig} config
 */
const config: StorybookViteConfig = {
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        sourceLoaderOptions: null,
        transcludeMarkdown: true
      }
    },
    '@storybook/addon-controls'
  ],
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true
  },
  framework: {
    name: '@storybook/react'
  },
  stories: [
    '../src/index.stories.mdx',
    '../src/blocks/*.stories.mdx',
    '../src/components/**/**/*.stories.@(mdx|tsx)'
  ],
  typescript: {
    reactDocgen: false
  },
  /**
   * Alters the default Vite configuration.
   *
   * @param {vite.InlineConfig} config - Default Vite configuration
   * @return {vite.InlineConfig} Vite configuration options
   */
  viteFinal(config: vite.InlineConfig): vite.InlineConfig {
    config = vite.mergeConfig(config, {
      plugins: [
        docgen({
          /**
           * Omits props from documentation generation.
           *
           * @param {PropItem} prop - Component prop data
           * @return {boolean} `false` for omitted prop, `true` otherwise
           */
          propFilter(prop: PropItem): boolean {
            if (prop.parent && /@types\/react/.test(prop.parent.fileName)) {
              // hide handlers unless explicitly defined by a story
              if (/^on[A-Z].*/.test(prop.name)) return false
            }

            return true
          },
          skipChildrenPropWithoutDoc: false,
          tsconfig: path.resolve('tsconfig.docgen.json')
        })
      ]
    } as vite.InlineConfig)

    return config
  }
}

export default config
```

### Why Vite Only?

Both `options.apply` and `options.enforce` are specific to the Vite Plugin API
(see [Conditional Application][10] and [Plugin Ordering][11]).

Future feature updates will also make use of [Vite specific hooks][12].

## Built With

- [`@rollup/pluginutils`][1]
- [`magic-string`][2]
- [`react-docgen-typescript`][3]
- [`telejson`][4]

[1]: https://github.com/rollup/plugins/tree/master/packages/pluginutils
[2]: https://github.com/Rich-Harris/magic-string
[3]: https://github.com/styleguidist/react-docgen-typescript
[4]: https://github.com/storybookjs/telejson
[5]: https://vitejs.dev
[6]:
  https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages#about-scopes-and-permissions-for-package-registries
[7]: https://docs.npmjs.com/cli/v8/commands/npm-install#description
[8]: https://yarnpkg.com/features/protocols#git
[9]:
  https://github.com/styleguidist/react-docgen-typescript/blob/v2.2.2/src/parser.ts#L83-L94
[10]: https://vitejs.dev/guide/api-plugin.html#conditional-application
[11]: https://vitejs.dev/guide/api-plugin.html#plugin-ordering
[12]: https://vitejs.dev/guide/api-plugin.html#vite-specific-hooks
