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
    }
  ]
}

module.exports = config
