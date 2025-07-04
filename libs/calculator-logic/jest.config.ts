import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Reading the SWC compilation config for the spec files
const swcJestConfig = JSON.parse(
  readFileSync(join(__dirname, '.spec.swcrc'), 'utf8')
);

// Disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves
swcJestConfig.swcrc = false;

const config = {
	displayName: "calculator-logic",
	preset: "../../jest.preset.js",
	testEnvironment: "node",
	transform: {
		"^.+\\.[tj]s$": ["@swc/jest", swcJestConfig]
	},
	moduleFileExtensions: ["ts", "js", "html"],
	moduleNameMapper: {
		"^(\\.\\.?\\/.+)\\.js$": "$1"
	},
	coverageDirectory: "test-output/jest/coverage"
};

export default config;
