module.exports = {
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['**/?(*.)+(spec|test).ts', '**/*.integration.ts'],
  collectCoverageFrom: ['src/**/*.{ts,js}', 'src/*.{ts,js}'],
  setupFiles: ['dotenv/config'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
  },
  modulePathIgnorePatterns: [
    '<rootDir>/src/generated',
    '<rootDir>/src/main.ts',
  ],
};
