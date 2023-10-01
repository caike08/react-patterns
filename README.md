# React Patterns - case studies

This repository contains a few example of common React patterns, where I tried to simplify their usage. The goal was to understand when each pattern can be used to help me write better code.

Inspired on:
- @kentcdodds [advanced react patterns examples](https://github.com/kentcdodds/advanced-react-patterns-v2/tree/main)
- @Vitaminvp [react patterns](https://github.com/Vitaminvp/react-patterns/tree/68bca6c7fe5c9c0c63d740ed2ae5b67dae315eef)

Proudly using:
- React@18
- Vite@4
- Bun (to replace NodeJS)
- Typescript
- TailwindCSS
- SASS preprocessor

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
