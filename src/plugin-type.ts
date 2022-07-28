/**
 * @file RDT Plugin - PluginReactDocgenTypeScript
 * @module vite-plugin-react-docgen-typescript/type
 */

import type { TransformPluginContext, TransformResult } from 'rollup'
import type { Plugin } from 'vite'
import type { PLUGIN_NAME } from './constants'

/**
 * Vite `react-docgen-typescript` plugin type.
 *
 * @extends {Plugin}
 */
interface PluginReactDocgenTypeScript extends Plugin {
  /**
   * Plugin ordering.
   *
   * @see https://vitejs.dev/guide/api-plugin.html#plugin-ordering
   */
  enforce: Required<Plugin>['enforce']

  /**
   * Plugin name.
   */
  name: typeof PLUGIN_NAME

  /**
   * Parses `id` for component docgen info.
   *
   * For a successfully parsed module, the final transform result will include
   * a new source map and updated version of `code` that includes logic to
   * attach a `__docgenInfo` property to all components in `id`.
   *
   * @async
   *
   * @param {TransformPluginContext} this - Plugin context
   * @param {string} code - Module code being transformed
   * @param {string} id - Path to module being transformed
   * @return {Promise<TransformResult>} Transform result
   */
  transform(
    this: TransformPluginContext,
    code: string,
    id: string
  ): Promise<TransformResult>
}

export type { PluginReactDocgenTypeScript as default }
