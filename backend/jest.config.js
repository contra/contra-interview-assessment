module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  setupFiles: ['dotenv/config'],
  globals: {
    // when we are testing we want to use a slightly different config
    // to allow for jest types
    'ts-jest': {
      tsconfig: '<rootDir>/src/tests/tsconfig.json',
    },
  },
};
