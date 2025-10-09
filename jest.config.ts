/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
const tsconfig = require('./tsconfig.json');

const config: Config = {
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths || {},
    {
      prefix: '<rootDir>/',
    },
  ),
};

export default config;
