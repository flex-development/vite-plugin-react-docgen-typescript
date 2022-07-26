/**
 * @file RDT Plugin - Implementation
 * @module vite-plugin-react-docgen-typescript/plugin
 */

import type { Plugin } from 'vite'
import { PLUGIN_NAME } from './constants'

/**
 * Creates a `react-docgen-typescript` plugin.
 *
 * @see https://github.com/styleguidist/react-docgen-typescript
 * @see https://vitejs.dev/guide/api-plugin.html
 *
 * @return {Plugin} Vite `react-docgen-typescript` plugin
 */
const plugin = (): Plugin => {
  return {
    name: PLUGIN_NAME
  }
}

export default plugin
