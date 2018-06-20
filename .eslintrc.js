module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb'],
  parser: 'babel-eslint',
  rules: {
    semi: 'off',
    'react/forbid-prop-types': ['error', { forbid: ['any', 'array'] }],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            modules: ['src', 'static', 'node_modules'],
          },
        },
      },
    },
  },
}
