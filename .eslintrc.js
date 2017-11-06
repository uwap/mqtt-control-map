module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react", "flowtype"
  ],
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error","double"],
    "semi": ["error","always"],
    "no-unused-vars": ["error", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],

    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": "error",

    "flowtype/define-flow-type": 2,
    "flowtype/boolean-style": "error",
    "flowtype/generic-spacing": ["error", "never"],
    "flowtype/no-dupe-keys": "error",
    "flowtype/union-intersection-spacing": ["error", "always"],
    "flowtype/no-weak-types": "warn",
    "flowtype/require-variable-type": "warn"
  }
};
