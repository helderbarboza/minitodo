import antfu from '@antfu/eslint-config'
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind'
import eslintPluginSvelte from 'eslint-plugin-svelte'
import eslintParserSvelte from 'svelte-eslint-parser'

export default antfu(
  {
    svelte: {
      overrides: {
        'svelte/html-quotes': ['error', { prefer: 'double' }],
      },
    },
  },
  {
    files: ['src/lib/i18n/**'],
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: eslintParserSvelte,
    },
  },
  {
    plugins: {
      'readable-tailwind': eslintPluginReadableTailwind,
    },
    rules: {
      ...eslintPluginReadableTailwind.configs.warning.rules,

      // FIXME kinda weird, injecting rules this way can break, considering this isn't on the docs
      ...eslintPluginSvelte.configs['flat/recommended'][2].rules,

      'readable-tailwind/multiline': ['warn', { printWidth: 100, group: 'never' }],

    },
  },
)
