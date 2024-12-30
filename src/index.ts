import type { Linter } from 'eslint';
import * as _parserPlain from 'eslint-parser-plain';
import stylelint from './rules/stylelint';

const parserPlain: Linter.Parser = {
  meta: {
    name: 'eslint-parser-plain',
  },
  ..._parserPlain as { parseForESLint: any },
};

export default {
  parserPlain,
  rules: {
    stylelint,
  },
};
