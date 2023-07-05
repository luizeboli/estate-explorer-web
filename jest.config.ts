import nextJest from 'next/jest';
import type { Config } from 'jest';

const createJestConfig = nextJest({
	dir: './',
});

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	restoreMocks: true,
	setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/*.d.ts',
		'!src/tests/**/*',
		'!src/app/**/*',
	],
};

export default createJestConfig(config);
