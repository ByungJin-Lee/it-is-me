/** @type {import('jest').Config} */
const config = {
  verbose: true,
  collectCoverage: true,
  // collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
  // setupFiles: ['<rootDir>/config/polyfills.js'],
  // setupTestFrameworkScriptFile: '<rootDir>/src/setupTests.ts',
  testMatch: [
    '<rootDir>/src/**/test/**/*.ts?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).ts?(x)',
  ],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
  },
  // preset: 'ts-jest',
  testEnvironment: 'jsdom',
}

module.exports = config
