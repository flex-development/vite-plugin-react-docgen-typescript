/**
 * @file Vitest Configuration
 * @module config/vitest
 * @see https://vitest.dev/config
 */

import { NodeEnv } from '@flex-development/tutils'
import ci from 'is-ci'
import path from 'node:path'
import type { UserConfig } from 'vite'
import inspect from 'vite-plugin-inspect'
import tsconfigpaths from 'vite-tsconfig-paths'
import GithubActionsReporter from 'vitest-github-actions-reporter'

/**
 * Creates a {@link UserConfig} object for test environments.
 *
 * @return {UserConfig} Vitest configuration options
 */
const config = (): UserConfig => {
  /**
   * Path to tsconfig file.
   *
   * @const {string} TSCONFIG_PATH
   */
  const TSCONFIG_PATH: string = path.resolve('tsconfig.json')

  return {
    define: {
      'import.meta.env.CI': ci,
      'import.meta.env.NODE_ENV': JSON.stringify(NodeEnv.TEST)
    },
    mode: NodeEnv.TEST,
    plugins: [tsconfigpaths({ projects: [TSCONFIG_PATH] }), inspect()],
    resolve: {
      extensions: ['.cjs', '.cts', '.js', '.jsx', '.mjs', '.mts', '.ts', '.tsx']
    },
    test: {
      allowOnly: !ci,
      clearMocks: true,
      coverage: {
        all: true,
        clean: true,
        exclude: ['**/__mocks__/**', '**/__tests__/**', 'src/index.ts'],
        extension: ['.ts'],
        include: ['src'],
        reporter: ['json-summary', 'lcov', 'text'],
        reportsDirectory: './coverage',
        skipFull: false
      },
      globalSetup: [
        './__tests__/setup/setup.ts',
        './__tests__/setup/teardown.ts'
      ],
      globals: true,
      hookTimeout: 10 * 1000,
      include: ['**/__tests__/*.spec.{ts,tsx}'],
      isolate: true,
      /**
       * Using `--coverage` results in a `Fatal error` if `maxThreads` **and**
       * `minThreads` sn't set to `1`.
       *
       * @see https://github.com/vitest-dev/vitest/issues/1171
       */
      maxThreads: 1,
      minThreads: 1,
      mockReset: false,
      outputFile: {
        json: './__tests__/report.json'
      },
      passWithNoTests: true,
      reporters: [
        'default',
        'json',
        ci ? new GithubActionsReporter() : './__tests__/reporters/notifier.ts'
      ],
      /**
       * Stores snapshots next to test files.
       *
       * @param {string} file - Path to test file
       * @param {string} snapshot - Snapshot name
       * @return {string} Custom snapshot path
       */
      resolveSnapshotPath(file: string, snapshot: string): string {
        return file + snapshot
      },
      restoreMocks: true,
      root: process.cwd(),
      setupFiles: ['./__tests__/setup/index.ts'],
      silent: false,
      snapshotFormat: {
        printBasicPrototype: true
      },
      testTimeout: 10 * 1000
    }
  }
}

export default config
