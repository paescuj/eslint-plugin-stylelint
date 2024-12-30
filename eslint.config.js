// @ts-check
import antfu from '@antfu/eslint-config';
import stylelint from 'eslint-plugin-stylelint';

export default antfu(
  {
    typescript: true,
    formatters: true,
    stylistic: {
      semi: true,
      overrides: {
        'style/arrow-parens': 'error',
        'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      },
    },
  },
  {
    files: ['**/*.css'],
    languageOptions: {
      parser: stylelint.parserPlain,
    },
    plugins: {
      stylelint,
    },
    rules: {
      'stylelint/stylelint': ['error', {
        extends: [
          'stylelint-config-standard',
        ],
      }],
    },
  },
);
