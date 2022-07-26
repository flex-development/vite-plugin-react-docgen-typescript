/**
 * @file ESLint Configuration - Web
 * @see https://eslint.org/docs/user-guide/configuring
 */

const { Linter } = require('eslint')

/**
 * @type {Linter.Config}
 * @const config - ESLint configuration object
 */
const config = {
  extends: ['plugin:react/recommended'],
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
  settings: {
    react: {
      version: require('./package.json').devDependencies.react
    }
  }
}

module.exports = config
