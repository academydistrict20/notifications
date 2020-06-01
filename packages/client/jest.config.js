const base = require('../../jest.config.base.js')
const pack = require('./package')

module.exports = {
  ...base,
  displayName: 'client',
  name: pack.name,
  rootDir: '../..',
  testMatch: [`<rootDir>/packages/client/**/*.spec.ts`],
  setupFiles: ['<rootDir>/packages/client/tests/localStorage.js'],
}
