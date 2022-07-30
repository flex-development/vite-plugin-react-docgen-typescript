/**
 * @file ESLint Configuration - Root
 * @see https://eslint.org/docs/user-guide/configuring
 */

const { Linter } = require('eslint')
const base = require('./.eslintrc.base.cjs')

/**
 * @type {Linter.Config}
 * @const config - ESLint configuration object
 */
const config = {
  root: true,
  extends: ['./.eslintrc.base.cjs', './.eslintrc.react.cjs'],
  overrides: [
    ...base.overrides,
    {
      files: ['__fixtures__/**'],
      rules: {
        'unicorn/filename-case': 0
      }
    },
    {
      files: ['build.config.ts'],
      rules: {
        'unicorn/prefer-module': 0
      }
    },
    {
      files: ['src/index.ts'],
      rules: {
        /**
         * mkdist converts `exports.default` to `module.exports = _default`.
         *
         * `exports.default` statements are only output if `export default ...`
         * is used for default exports.
         *
         * this means that `export { default } from '...'` should **not** be
         * used where default exports should be supported, as with the package
         * entry point.
         *
         * @see https://github.com/unjs/mkdist/blob/v0.3.13/src/loaders/js.ts#L40
         */
        'unicorn/prefer-export-from': 0
      }
    }
  ]
}

module.exports = config
