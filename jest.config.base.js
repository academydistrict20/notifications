module.exports = {
  roots: [
      "<rootDir>"
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
      "(tests/.*.mock).(jsx?|tsx?)$"
  ],
  verbose: true
}
