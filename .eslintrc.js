module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": ["airbnb"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "class-methods-use-this": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": true
      }
    ],
    "import/no-unresolved": "off",
    "no-plusplus": "off",
    'react/forbid-prop-types': 'off',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/no-unused-state": "off",
    "semi": "off",
    "semi-spacing": "error",
    "semi-style": [
      "error",
      "last"
    ]
  }
};
