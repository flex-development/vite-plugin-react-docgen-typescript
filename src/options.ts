/**
 * @file RDT Plugin - Options
 * @module vite-plugin-react-docgen-typescript/Options
 */

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
   * **Note**: Applied **after** {@link include}.
   *
   * @see https://github.com/micromatch/micromatch
   *
   * @default []
   */
  exclude?: string[]

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
   *
   * @default doc=>doc
   */
  handler?(
    doc: ComponentDoc,
    code: string,
    id: string
  ): ComponentDoc | Promise<ComponentDoc>

  /**
   * Glob patterns matching files to parse for docgen information.
   *
   * @see https://github.com/micromatch/micromatch
   *
   * @default ['**.tsx']
   */
  include?: string[]

  /**
   * Generate the name of the component to add a `__docgenInfo` property to.
   *
   * **Note**: `code` may have transforms from other plugins already applied.
   *
   * @see {@link ComponentDoc}
   *
   * @param {ComponentDoc} doc - Component docgen info object
   * @param {string} code - Module code being transformed
   * @param {string} id - Path to module being transformed
   * @return {Promise<string> | string} Component name
   *
   * @default doc=>doc.displayName
   */
  name?(doc: ComponentDoc, code: string, id: string): Promise<string> | string

  /**
   * Name of tsconfig file or path to tsconfig file.
   *
   * @default path.resolve('tsconfig.json')
   */
  tsconfig?: string
}

export type { Options as default }
