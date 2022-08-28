const tsconfigs = ['./tsconfig.json'];

const ruleOverrides = {
  '@typescript-eslint/no-redeclare': 0,
  'arrow-body-style': 0,
  'canonical/destructuring-property-newline': 0,
  'canonical/export-specifier-newline': 0,
  'canonical/filename-match-regex': 0,
  'canonical/import-specifier-newline': 0,
  'default-case': 0,
  'default-case-last': 0,
  'func-style': 0,
  'import/extensions': 0,
  'jest/prefer-strict-equal': 0,
  'jsx-a11y/anchor-is-valid': 0,
  'jsx-a11y/mouse-events-have-key-events': 0,
  'no-restricted-properties': [
    2,
    {
      message: 'Use fast-safe-stringify',
      object: 'JSON',
      property: 'stringify',
    },
  ],
  'no-warning-comments': 0,
  'prefer-destructuring': 0,
  'prefer-object-spread': 0,
  'react/no-unstable-nested-components': 0,
  'react/prop-types': 0,
  'require-unicode-regexp': 0,
  'unicorn/no-array-callback-reference': 0,
  'unicorn/no-array-for-each': 0,
  'unicorn/no-array-reduce': 0,
  'unicorn/no-unsafe-regex': 0,
};

module.exports = {
  ignorePatterns: ['sanity/', 'public/'],
  overrides: [
    {
      excludedFiles: '*.test.ts',
      extends: [
        'next',
        'canonical',
        'canonical/react',
        'canonical/typescript',
        'prettier',
      ],
      files: '*.ts',
      parserOptions: {
        project: tsconfigs,
      },
      rules: ruleOverrides,
    },
    {
      extends: [
        'next',
        'canonical',
        'canonical/react',
        'canonical/jsx-a11y',
        'canonical/typescript',
        'prettier',
      ],
      files: '*.tsx',
      parserOptions: {
        project: tsconfigs,
      },
      rules: ruleOverrides,
    },
    {
      extends: [
        'canonical',
        'canonical/typescript',
        'canonical/jest',
        'prettier',
      ],
      files: '*.test.{ts,tsx}',
      parserOptions: {
        project: tsconfigs,
      },
      rules: ruleOverrides,
    },
    {
      extends: ['next', 'canonical', 'canonical/node', 'prettier'],
      files: '*.{js,mjs}',
      parserOptions: {
        sourceType: 'module',
      },
      rules: ruleOverrides,
    },
    {
      extends: ['canonical/json'],
      files: '*.json',
      rules: {
        'jsonc/no-comments': 0,
      },
    },
    {
      extends: ['canonical/yaml'],
      files: '*.yaml',
      rules: {
        'yml/no-empty-mapping-value': 0,
        'yml/require-string-key': 0,
      },
    },
  ],
  root: true,
};
