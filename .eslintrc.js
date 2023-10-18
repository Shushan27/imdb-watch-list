module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      process.env.NODE_ENV !== 'production' ? 'warn' : 'error',
      { singleQuote: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'no-unused-vars': [
      process.env.NODE_ENV !== 'production' ? 'warn' : 'error',
      { varsIgnorePattern: '^_' },
    ],
    'no-debugger': Number(process.env.NODE_ENV !== 'production'),
  },
};
