/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/__tests__'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@reduxjs/toolkit$': '<rootDir>/src/__mocks__/@reduxjs/toolkit.ts',
  },
  transform: {
    '^.+\\.(mjs|[tj]sx?)$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!@reduxjs/toolkit)'],
  testMatch: ['<rootDir>/src/__tests__/**/*.(test|spec).{ts,tsx}'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/__tests__/**'],
  testEnvironmentOptions: {
    customExportConditions: ['browser', 'module', 'default'],
  },
};
