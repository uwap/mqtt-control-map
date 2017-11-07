module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:flowtype/recommended",
    "plugin:react/recommended"
  ],
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
    // possible errors
    "getter-return": "error",
    "no-extra-parens": ["error", "functions"],
    "no-template-curly-in-string": "error",
    "valid-jsdoc": "error",

    // best practices
    "accessor-pairs": "error",
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],
    "curly": "error",
    "default-case": ["error", { "commentPattern": "^skip\\sdefault" }],
    "dot-location": ["error", "property"],
    "eqeqeq": ["error", "smart"],
    "no-alert": "error",
    "no-caller": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-label": "error",
    "no-floating-decimal": "error",
    "no-implicit-coercion": "error",
    "no-implied-eval": "error",
    "no-invalid-this": "error",
    "no-iterator": "error",
    "no-loop-func": "error",
    "no-multi-spaces": "warn",
    "no-multi-str": "error",
    "no-new": "warn",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": ["error", {
      "allowShortCircuit": true,
      "allowTernary": true
    }],
    "no-useless-call": "warn",
    "no-useless-return": "error",
    "no-warning-comments": ["warn", { "terms": ["todo", "fixme", "error", "bug"] }],
    "no-with": "error",
    "prefer-promise-reject-errors": "error",
    "radix": "warn",
    "require-await": "warn",
    "vars-on-top": "warn",
    "yoda": "warn",

    // variables
    "init-declarations": ["error", "always"],
    "no-unused-vars": ["error", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
    "no-catch-shadow": "error",
    "no-label-var": "error",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-undef-init": "error",
    "no-undefined": "error",
    "no-use-before-define": "error",

    // stylistic issues
    "array-bracket-spacing": ["error", "never"],
    "block-spacing": ["error", "always"],
    "brace-style": ["warn", "1tbs"],
    "camelcase": ["warn", { properties: "always" }],
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }],
    "comma-spacing": "warn",
    "computed-property-spacing": ["warn", "never"],
    "eol-last": ["warn", "always"],
    "func-call-spacing": ["warn", "never"],
    "func-names": ["warn", "as-needed"],
    "indent": ["warn", 2],
    "jsx-quotes": "warn",
    "key-spacing": "warn",
    "keyword-spacing": "warn",
    "linebreak-style": ["error", "unix"],
    "lines-around-comment": "warn",
    "lines-between-class-members": ["warn", "always"],
    "max-len": "error",
    "max-nested-callbacks": ["error", 5],
    "max-statements-per-line": "error",
    "multiline-comment-style": ["error", "starred-block"],
    "new-parens": "error",
    "no-array-constructor": "error",
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "warn",
    "no-whitespace-before-property": "error",
    "one-var": ["error", "never"],
    "semi": ["error", "always"],
    "semi-spacing": "error",
    "semi-style": "error",
    "space-before-blocks": "error",
    "quotes": ["error", "double"],

    // react
    "react/prop-types": "off",
    "react/display-name": "off",

    // flow
    "flowtype/no-dupe-keys": "error",
    "flowtype/no-weak-types": "warn",
    "flowtype/require-variable-type": "warn"
  }
};
