module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "indent": [
            "off",
            "tab" 
        ],
        "linebreak-style": [
            "off",
            "unix"
        ],
        "quotes": [
            "off",
            "double"
        ],
        "semi": [
            "off",
            "always"
        ]
    }
};