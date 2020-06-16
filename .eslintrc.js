module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "rules": {
    "no-debugger": 2,
    // "no-console": 2,
    "indent": [
      2,
      2
    ],
    "space-before-blocks": [
      2,
      "always"
    ],
    "space-before-function-paren": [
      0,
      "always"
    ],
    "space-in-parens": [
      0,
      "never"
    ]
  },
  "globals": {
    "window": true,
    "$": true
  },
  "parserOptions": {
    "parser": "babel-eslint"
  }
}
