// jest.config.js

export default {
    testEnvironment: 'jsdom', // Simulate a browser environment
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Setup file for global configurations
    moduleNameMapper: {
      '\\.(css|scss|less|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transform JS/JSX files
      '^.+\\.tsx?$': 'ts-jest',    // Transform TS/TSX files (if you're using TypeScript)
    },
  };
  