/**
 * @file RDT Plugin - Implementation
 * @module vite-plugin-react-docgen-typescript/plugin
 */

import { createFilter } from '@rollup/pluginutils'
import MagicString from 'magic-string'
import path from 'node:path'
import * as rdt from 'react-docgen-typescript'
import type { TransformResult } from 'rollup'
import * as telejson from 'telejson'
import { PLUGIN_NAME } from './constants'
import type Options from './options'
import type PluginReactDocgenTypeScript from './plugin-type'

/**
 * Creates a `react-docgen-typescript` plugin.
 *
 * @see https://github.com/styleguidist/react-docgen-typescript
 * @see https://vitejs.dev/guide/api-plugin.html
 *
 * @param {Options} [options] - Plugin options
 * @return {PluginReactDocgenTypeScript} Vite `react-docgen-typescript` plugin
 */
const plugin = ({
  apply,
  componentNameResolver,
  customComponentTypes = [],
  enforce = 'pre',
  exclude = ['**/**.stories.tsx'],
  handler,
  include = ['**/**.tsx'],
  propFilter = prop => !prop.parent?.fileName.includes('node_modules'),
  savePropValueAsString = false,
  shouldExtractLiteralValuesFromEnum = false,
  shouldExtractValuesFromUnion = false,
  shouldIncludeExpression = false,
  shouldIncludePropTagMap = true,
  shouldRemoveUndefinedFromOptional = true,
  skipChildrenPropWithoutDoc = true,
  sourcemap = true,
  tsconfig = path.resolve('tsconfig.json')
}: Options = {}): PluginReactDocgenTypeScript => {
  /**
   * Filter function that determines which modules should be operated on.
   *
   * @see https://github.com/rollup/plugins/tree/master/packages/pluginutils
   *
   * @const {(id: unknown) => boolean} filter
   */
  const filter: (id: unknown) => boolean = createFilter(include, exclude)

  /**
   * Component docgen info parser.
   *
   * @see https://github.com/styleguidist/react-docgen-typescript#usage
   *
   * @const {rdt.FileParser} parser
   */
  const parser: rdt.FileParser = rdt.withCustomConfig(tsconfig, {
    componentNameResolver,
    customComponentTypes,
    propFilter,
    savePropValueAsString,
    shouldExtractLiteralValuesFromEnum,
    shouldExtractValuesFromUnion,
    shouldIncludeExpression,
    shouldIncludePropTagMap,
    shouldRemoveUndefinedFromOptional,
    skipChildrenPropWithoutDoc
  })

  return {
    apply,
    enforce,
    name: PLUGIN_NAME,
    transform: async (code: string, id: string): Promise<TransformResult> => {
      // do nothing if module should not be operated on
      if (!filter(id)) return

      /**
       * Component docgen info parsed from {@link id}.
       *
       * @see {@link rdt.ComponentDoc}
       *
       * @const {rdt.ComponentDoc[]} docs
       */
      const docs: rdt.ComponentDoc[] = parser.parse(id)

      // bail if missing component docgen info
      if (docs.length === 0) return null

      /**
       * {@link code} as `MagicString`.
       *
       * @see https://github.com/Rich-Harris/magic-string
       *
       * @const {MagicString} src
       */
      const src: MagicString = new MagicString(code)

      for (let doc of docs) {
        // apply additional processing to component docgen info
        if (handler) doc = await handler(doc, code, id)

        /**
         * {@link doc} stringified.
         *
         * @see https://github.com/storybookjs/telejson
         *
         * @const {string} __docgenInfo
         */
        const __docgenInfo: string = telejson.stringify(doc)

        // add __docgenInfo property
        src.append(`\n;${doc.displayName}.__docgenInfo=${__docgenInfo}`)
      }

      if (sourcemap === false) return src.toString()

      return {
        code: src.toString(),
        map: src.generateMap({
          ...(sourcemap === true ? { hires: true } : sourcemap),
          source: id
        })
      }
    }
  }
}

export default plugin
