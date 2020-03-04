module.exports = {
    "parser": "babel-eslint",
    "extends": [
      "airbnb",
      "plugin:flowtype/recommended"
    ],
    "plugins": [
      "react",
      "jsx-a11y",
      "import",
      "flowtype"
    ],
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-console": 0,
      "max-len": [1, 160],
      "no-lonely-if": 0,
      "prefer-template": 0,
      "no-unused-vars": [2, { "args": "none" }],
      "camelcase": 0,
      "jsx-a11y/label-has-for": [ 2, {
            "required": {
                "every": [ "id" ]
            },
            "allowChildren": true
       }],
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/anchor-is-valid": 0,
      "react/no-did-mount-set-state": 0,
      "react/no-did-update-set-state": 0,
      "class-methods-use-this": 0,
      "no-underscore-dangle": 0,
      "no-useless-computed-key": 0,
      "operator-linebreak": ["error", "after", { "overrides": { "?": "ignore", ":": "ignore" } }]
    },
    "globals": {
      "navigator": true,
      "localStorage": true,
      "window": true,
      "document": true,
      "alert": true
    }
};
