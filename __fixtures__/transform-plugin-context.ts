/**
 * @file Fixtures - TransformPluginContext
 * @module fixtures/TransformPluginContext
 */

import type { TransformPluginContext } from 'rollup'
import { VERSION as rollupVersion } from 'rollup'

/**
 * Mock transform plugin context.
 *
 * @const {TransformPluginContext} context
 */
const context: TransformPluginContext = {
  addWatchFile: vi.fn(),
  cache: {
    delete: vi.fn().mockReturnValue(true),
    get: vi.fn(),
    has: vi.fn().mockReturnValue([false, true][Math.floor(Math.random() * 2)]),
    set: vi.fn()
  },
  emitAsset: vi.fn(),
  emitChunk: vi.fn(),
  emitFile: vi.fn(),
  error: vi.fn(),
  getAssetFileName: vi.fn(),
  getChunkFileName: vi.fn(),
  getCombinedSourcemap: vi.fn(),
  getFileName: vi.fn(),
  getModuleIds: vi.fn().mockReturnValue(
    (function* ids(): IterableIterator<string> {
      yield faker.datatype.uuid()
      yield faker.datatype.uuid()
      yield faker.datatype.uuid()
    })()
  ),
  getModuleInfo: vi.fn(),
  getWatchFiles: vi.fn().mockReturnValue([]),
  isExternal: vi.fn(),
  load: vi.fn(),
  meta: { rollupVersion, watchMode: false },
  moduleIds: (function* ids(): IterableIterator<string> {
    yield faker.datatype.uuid()
    yield faker.datatype.uuid()
    yield faker.datatype.uuid()
  })(),
  parse: vi.fn(),
  resolve: vi.fn().mockResolvedValue(null),
  resolveId: vi.fn().mockResolvedValue(null),
  setAssetSource: vi.fn(),
  warn: vi.fn()
}

export default context
