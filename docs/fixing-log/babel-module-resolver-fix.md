# Babel Module Resolver Fix

## Problem
Import paths in the project were becoming long and cumbersome, making it difficult to navigate and maintain the codebase. For example, importing a component might look like `import MyComponent from '../../../components/MyComponent';`.

## Solution
We configured the `babel-plugin-module-resolver` in `babel.config.js` to introduce a root import alias. Specifically, we added the following configuration:

```javascript
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
          },
        },
      ],
      'expo-router/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
```

This allows us to use `@/` as an alias for the `src/` directory. Now, the previous example import can be simplified to `import MyComponent from '@/components/MyComponent';`.

## Benefits
- **Improved Readability:** Shorter, more consistent import paths.
- **Easier Refactoring:** If the directory structure changes within `src/`, we only need to update the paths relative to `src/`, not the entire relative path.
- **Better Developer Experience:** Simplifies the mental model of the project structure. 