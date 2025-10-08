// import { readFileSync } from 'fs';

// import * as path from 'path';
// import type { JestConfigWithTsJest } from "ts-jest";
// // Utiliser __dirname basé sur CommonJS
// const __dirname = path.resolve();
//
// // Charge dynamiquement tsconfig.json
// const tsconfig = JSON.parse(readFileSync(path.join(__dirname, 'tsconfig.json'), 'utf-8'));

// Exporter en tant que CommonJS
// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   transform: {
//     '^.+\\.(ts|html)$': 'ts-jest',
//   },
//   moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths || {}, {
//     prefix: '<rootDir>/',
//   }),
//   moduleFileExtensions: ['ts', 'js', 'json', 'html'],
//   testMatch: ['**/+(*.)+(spec|test).+(ts|js)'],
// };
// import type { JestConfigWithTsJest } from "ts-jest";
// const config: JestConfigWithTsJest = {
//   verbose: true,
//   transform: {
//     "^.+\\.ts?$": [
//       "ts-jest",
//       {
//         useESM: true,
//       },
//     ],
//   },
//   extensionsToTreatAsEsm: [".ts"],
//   // moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths || {}, {
//   //   prefix: '<rootDir>/',
//   // }),
// };
//
// export default config;
// import { createDefaultEsmPreset } from 'ts-jest';
// const defaultEsmPreset = createDefaultEsmPreset();
//
// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   testEnvironment: "node",
//   // [... whatever else you want to configure]
//   ...defaultEsmPreset,
//   moduleNameMapper: {
//     "^(\\.{1,2}/.*)\\.js$": "$1",
//   },
// };
// import type {Config} from 'jest';
// import * as path from 'node:path';
// import { readFileSync } from 'node:fs';
// import { pathsToModuleNameMapper,createDefaultEsmPreset } from 'ts-jest';
// import { fileURLToPath } from "node:url";
// import {dirname} from '@angular/compiler-cli';
// //
// // const __dirname = dirname(fileURLToPath(import.meta.url));
// const __dirname = path.resolve(process.cwd());
// const tsconfig = JSON.parse(readFileSync(path.join(__dirname, 'tsconfig.json'), 'utf-8'));
//
// module.exports  = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//     transform: {
//     '^.+\\.(ts|html)$': 'ts-jest',
//   },
//
//   moduleFileExtensions: ['ts', 'js', 'json', 'html'],
//   testMatch: ['**/+(*.)+(spec|test).+(ts|js)'],
// };
//
// // export default config;
import 'jest-preset-angular/setup-jest';

export default {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  coverageReporters: ['html', 'text-summary'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
