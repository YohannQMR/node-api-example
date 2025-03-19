module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // Enforce consistent indentation
    'indent': ['error', 2],
    // Enforce the consistent use of either backticks, double, or single quotes
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    // Require or disallow semicolons instead of ASI
    'semi': ['error', 'always'],
    // Enforce consistent spacing before and after commas
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    // Enforce consistent spacing before function parenthesis
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    // Enforce consistent spacing inside braces
    'object-curly-spacing': ['error', 'always'],
    // Enforce consistent spacing inside array brackets
    'array-bracket-spacing': ['error', 'never'],
    // Require const declarations for variables that are never reassigned
    'prefer-const': 'error',
    // Disallow unused variables
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    // Require Error objects to be thrown
    'no-throw-literal': 'error',
    // Enforce consistent line breaks
    'linebreak-style': ['error', 'unix'],
    // Maximum line length
    'max-len': ['error', { 'code': 100, 'ignoreComments': true, 'ignoreStrings': true }],
    // Disallow console statements in production
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // Disallow debugger statements in production
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
};
