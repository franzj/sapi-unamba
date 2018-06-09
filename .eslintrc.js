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
  "rules": {
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-plusplus": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "semi": "off",
    "semi-spacing": "error",
    "semi-style": [
      "error",
      "last"
    ]
  }
};
