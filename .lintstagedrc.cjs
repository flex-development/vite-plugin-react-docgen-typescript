/**
 * @file Lint Staged Configuration
 * @see https://github.com/okonet/lint-staged
 */

/**
 * @type {string[]}
 * @const extensions - ESLint extensions
 */
const extensions = require('./.vscode/settings')['eslint.options'].extensions

module.exports = {
  /**
   * Fix code style.
   */
  [`**/*.{${extensions.join(',')}}`]: ['yarn fix:lint', 'git add -A'],

  /**
   * Fix formatting and check spelling.
   */
  '*': ['yarn fix:format', 'yarn check:spelling', 'git add -A'],

  /**
   * Run type check.
   */
  '{**/*.ts,**/*.tsx,**/tsconfig.*}': [
    /**
     * Returns the project's type checking command.
     *
     * @return {string} Type check command
     */
    () => 'yarn check:types'
  ],

  /**
   * Deduplicate dependencies.
   */
  'yarn.lock': ['yarn check:dedupe']
}
