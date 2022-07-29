/**
 * @file RDT Plugin - Options
 * @module vite-plugin-react-docgen-typescript/options
 */

import type { SourceMapOptions } from 'magic-string'
import type { ComponentDoc, ParserOptions } from 'react-docgen-typescript'
import type { Plugin } from 'vite'

/**
 * Vite `react-docgen-typescript` plugin options.
 *
 * @see https://github.com/styleguidist/react-docgen-typescript
 *
 * @extends {ParserOptions}
 */
interface Options extends ParserOptions {
  /**
   * Apply plugin only during serve or build, or on certain conditions.
   *
   * @see https://vitejs.dev/guide/api-plugin.html#conditional-application
   */
  apply?: Plugin['apply']

  /**
   * Plugin ordering.
   *
   * @see https://vitejs.dev/guide/api-plugin.html#plugin-ordering
   *
   * @default 'pre'
   */
  enforce?: Plugin['enforce']

  /**
   * Glob patterns matching files to exclude from parsing.
   *
   * @see https://github.com/micromatch/picomatch
   *
   * @default ['**\/**.stories.tsx']
   */
  exclude?: (RegExp | string)[]

  /**
   * Apply additional processing to a `ComponentDoc` before `__docgenInfo` is
   * declared and assigned a value.
   *
   * **Note**: `code` may have transforms from other plugins already applied.
   *
   * @see {@link ComponentDoc}
   *
   * @param {ComponentDoc} doc - Component docgen info object
   * @param {string} code - Module code being transformed
   * @param {string} id - Path to module being transformed
   * @return {ComponentDoc | Promise<ComponentDoc>} Augmented `doc`
   */
  handler?(
    doc: ComponentDoc,
    code: string,
    id: string
  ): ComponentDoc | Promise<ComponentDoc>

  /**
   * Glob patterns matching files to parse for docgen information.
   *
   * @see https://github.com/micromatch/picomatch
   *
   * @default ['**\/**.tsx']
   */
  include?: (RegExp | string)[]

  /**
   * Include [version 3 sourcemap][1] in transform result.
   *
   * [1]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit
   *
   * @see https://github.com/Rich-Harris/magic-string#sgeneratemap-options-
   *
   * @default true
   */
  sourcemap?: Omit<SourceMapOptions, 'source'> | boolean

  /**
   * Name of tsconfig file or path to tsconfig file.
   *
   * @default path.resolve('tsconfig.json')
   */
  tsconfig?: string
}

export type { Options as default }
