module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb'],
  parser: 'babel-eslint',
  rules: {
    semi: 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/forbid-prop-types': ['error', { forbid: ['any', 'array'] }],
    'react/destructuring-assignment': 'off',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['.js', '.jsx'],
            modules: ['src', 'static', 'node_modules'],
          },
        },
      },
    },
  },
}
