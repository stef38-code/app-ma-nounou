/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const tsconfig = require('./tsconfig.json');

const config: Config = {
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/e2e'],
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths || {},
    {
      prefix: '<rootDir>/',
    },
  ),
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
};

export default config;
