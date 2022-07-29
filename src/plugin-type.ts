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
   * For successfully parsed and transformed modules, the function will return
   * an updated version of `code` that includes logic to add a `__docgenInfo`
   * property to each component exported from `id`. If `options.sourcemap` is
   * truthy, the function will also return a [version 3 sourcemap][1].
   *
   * If `id` doesn't meet filtering requirements (set by `options.exclude` and
   * `options.include`), the function will return `undefined`. If `id` does end
   * up being parsed, but doesn't yield any docgen information, `null` will be
   * returned instead.
   *
   * [1]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit
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
