import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintJs from '@eslint/js';

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      '.expo/',
      'dist/',
      'babel.config.js',
      'metro.config.js',
      'tamagui.config.ts',
      'eslint.config.js',
    ],
  },
  // Configuration for JavaScript files (including JSX)
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
        '__DEV__': 'readonly',
        'React': 'readonly',
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
        alias: {
          map: [
            ['@', './src'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      },
    },
    rules: {
    },
  },
  // Configuration for TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
        '__DEV__': 'readonly',
        'React': 'readonly',
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
        alias: {
          map: [
            ['@', './src'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'off',
    },
  },
  eslintJs.configs.recommended,
); 