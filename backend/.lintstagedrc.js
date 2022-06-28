module.exports = {
  'src/**/*.graphql': [
    'format-graphql --write=true --sort-arguments --sort-definitions --sort-fields',
    'prettier --write',
  ],
  '*.{js,json,ts,yml,yaml}': [
    'prettier --write',
  ],
  '*.{js,ts}': [
    'eslint --fix',
  ],
  '*.ts': () => [
    'tsc --noEmit'
  ],
}
