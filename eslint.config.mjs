import vue from 'eslint-plugin-vue'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import parser from 'vue-eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    ignores: [
      '.gitignore',
      'Jenkinsfile',
      '.husky',
      '.vscode',
      '**/*.json',
      '**/dist/',
      '**/docker/'
    ]
  },
  {
    plugins: {
      vue,
      '@typescript-eslint': typescriptEslint,
      prettier
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest
      },

      parser: parser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },

    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.vue', '.json', '.js']
        }
      }
    },

    rules: {
      indent: [
        'error',
        2,
        {
          SwitchCase: 1
        }
      ],

      'linebreak-style': ['error', 'unix'],

      quotes: [
        'error',
        'single',
        {
          avoidEscape: true
        }
      ],

      semi: ['error', 'never'],
      'no-mixed-spaces-and-tabs': ['warn'],
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-var-requires': ['off'],
      '@typescript-eslint/no-non-null-asserted-optional-chain':
        ['off'],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-unsafe-function-type': [
        'error'
      ],
      'brace-style': [
        'warn',
        '1tbs',
        {
          allowSingleLine: true
        }
      ],

      'no-undef': 'off',
      'no-empty': 'warn',
      'vue/no-multiple-template-root': 'off',
      'vue/no-v-model-argument': 'off',
      'vue/no-v-for-template-key': 'off',
      'vue/no-v-for-template-key-on-child': 'error'
    }
  },
  {
    files: ['**/*.json'],

    rules: {
      quotes: ['error', 'double']
    }
  }
]
