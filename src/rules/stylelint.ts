import type { Rule } from 'eslint';
import type { Config, LintResult } from 'stylelint';
import { join } from 'node:path';
import { messages, reportDifferences } from 'eslint-formatting-reporter';
import { createSyncFn } from 'synckit';
import { dirWorkers } from '../dir';

let format: (code: string, config: Config) => { formatted: string; warnings: LintResult['warnings'] };

export default {
  meta: {
    type: 'layout',
    docs: {
      description: 'Use Stylelint to lint / format code',
      category: 'Stylistic',
    },
    fixable: 'whitespace',
    schema: [
      {
        type: 'object',
      },
    ],
    messages,
  },
  create(context) {
    if (!format)
      format = createSyncFn(join(dirWorkers, 'stylelint.cjs')) as any;

    return {
      Program() {
        const sourceCode = context.sourceCode.text;
        try {
          const { formatted, warnings } = format(sourceCode, context.options[0]);

          for (const warning of warnings) {
            context.report({
              loc: {
                start: { line: warning.line, column: warning.column },
                end: { line: warning.endLine ?? warning.line, column: warning.endColumn ?? warning.column },
              },
              message: warning.text,
            });
          }

          reportDifferences(context, sourceCode, formatted);
        } catch (error) {
          const message = error instanceof Error ? error.message : error;

          context.report({
            loc: {
              start: { line: 1, column: 0 },
              end: { line: 1, column: 0 },
            },
            message: `Failed to run Stylelint: ${message}`,
          });
        }
      },
    };
  },
} satisfies Rule.RuleModule;
