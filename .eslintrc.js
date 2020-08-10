module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // Lets us write JSX in .tsx files.
    // This may lead to more verbose code, but being able to easily see that a variable is
    // coming from props makes code more readable imo.
    "react/destructuring-assignment": 0,
    // Prevent "unable to resolve file path" errors with Typescript files.
    // https://github.com/benmosher/eslint-plugin-import/issues/1615#issuecomment-577500405
  },
  settings: {
    // Prevent "unable to resolve file path" errors with Typescript files.
    // https://github.com/benmosher/eslint-plugin-import/issues/1615#issuecomment-577500405
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
    },
  },
};
