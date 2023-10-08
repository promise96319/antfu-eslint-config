import { GLOB_JSX, GLOB_TSX } from '../globs'
import { pluginReact, pluginReactHooks } from '../plugins'
import type { FlatESLintConfigItem, OptionsOverrides } from '../types'

export function react(
  options: OptionsOverrides = {},
): FlatESLintConfigItem[] {
  const { overrides = {} } = options

  return [
    {
      name: 'antfu:react:setup',
      plugins: {
        'react': pluginReact,
        'react-hooks': pluginReactHooks,
      },
    },
    {
      files: [GLOB_JSX, GLOB_TSX],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      name: 'antfu:react:rules',
      rules: {
        ...pluginReact.configs.recommended.rules,
        ...pluginReactHooks.configs.recommended.rules,

        'react/jsx-boolean-value': 'error',
        'react/jsx-closing-bracket-location': 'error',
        'react/jsx-closing-tag-location': 'error',
        'react/jsx-curly-brace-presence': ['error', 'never'],
        'react/jsx-curly-newline': ['error', 'consistent'],
        'react/jsx-curly-spacing': ['error', { children: true, when: 'never' }],
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
        'react/jsx-indent': ['error', 2, { checkAttributes: true, indentLogicalExpressions: true }],
        'react/jsx-indent-props': ['error', 2],
        'react/jsx-key': ['error', { checkFragmentShorthand: true, warnOnDuplicates: true }],
        'react/jsx-max-props-per-line': [
          'error',
          {
            maximum: 1,
            when: 'multiline',
          },
        ],
        'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
        'react/jsx-tag-spacing': [
          'error',
          {
            afterOpening: 'never',
            beforeClosing: 'never',
            beforeSelfClosing: 'always',
            closingSlash: 'never',
          },
        ],

        'react/jsx-wrap-multilines': [
          'error',
          {
            arrow: 'parens-new-line',
            assignment: 'parens-new-line',
            condition: 'parens-new-line',
            declaration: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'parens-new-line',
            return: 'parens-new-line',
          },
        ],

        'style/jsx-quotes': ['error', 'prefer-double'],

        ...overrides,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ]
}
