<<<<<<< HEAD
=======
// @ts-check
import sortKeys from 'eslint-plugin-sort-keys'
>>>>>>> upstream/main
import styleMigrate from '@stylistic/eslint-plugin-migrate'
import sortKeys from 'eslint-plugin-sort-keys'
import antfu from './dist/index.js'

export default antfu(
  {
    vue: true,
    react: true,
    typescript: true,
    ignores: [
      'fixtures',
      '_fixtures',
    ],
  },
  {
    files: ['src/**/*.ts'],
    plugins: {
      'sort-keys': sortKeys,
    },
    rules: {
      'sort-keys/sort-keys-fix': 'error',
    },
  },
  {
    files: ['src/configs/*.ts'],
    plugins: {
      'style-migrate': styleMigrate,
    },
    rules: {
      'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
    },
  },
)
