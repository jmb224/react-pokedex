module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!axios)/', '<rootDir>/node_modules/(?!styled)/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  testMatch: ['**/*.test.{ts,tsx}']
};
