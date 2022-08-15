/**
 * @file Commitlint Configuration
 * @module config/commitlint
 * @see https://commitlint.js.org/#/guides-local-setup
 * @see https://commitlint.js.org/#/reference-configuration
 */

import type { UserConfig } from '@commitlint/types'

/** @const {UserConfig} config - commitlint configuration */
const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  ignores: [],
  rules: {
    'scope-case': [2, 'always', 'kebab-case'],
    'scope-enum': [
      2,
      'always',
      [
        'cjs',
        'constants',
        'deps',
        'deps-dev',
        'deps-opt',
        'deps-peer',
        'docgen',
        'esm',
        'github',
        'helpers',
        'hybrid',
        'options',
        'pkg',
        'plugin',
        'publish',
        'release',
        'scripts',
        'tests',
        'ts',
        'vite',
        'vscode',
        'workflows',
        'yarn'
      ]
    ],
    'subject-case': [1, 'always', 'lower-case'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'wip'
      ]
    ]
  }
}

export default config
