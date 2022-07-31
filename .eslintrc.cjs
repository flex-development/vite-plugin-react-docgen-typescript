/**
 * @file ESLint Configuration - Root
 * @see https://eslint.org/docs/user-guide/configuring
 */

/**
 * @type {import('eslint').Linter.Config}
 * @const config - ESLint configuration object
 */
const config = {
  root: true,
  extends: ['./.eslintrc.base.cjs', 'plugin:react/recommended'],
  plugins: ['react'],
  rules: {
    'react/display-name': 2,
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'react/jsx-fragments': 0,
    'react/jsx-uses-react': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/self-closing-comp': 1
  },
  overrides: [
    ...require('./.eslintrc.base.cjs').overrides,
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
  ],
  settings: {
    react: {
      version: require('./package.json').devDependencies.react
    }
  }
}

module.exports = config
