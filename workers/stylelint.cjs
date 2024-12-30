const { runAsWorker } = require('synckit');

let stylelint;

runAsWorker(async (code, config) => {
  if (!stylelint)
    stylelint = (await import('stylelint')).default;

  const { code: formatted, results } = await stylelint.lint({ code, fix: true, config });

  const warnings = results.map((result) => result.warnings).flat();

  return { formatted, warnings };
});
