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
};

export default createJestConfig(config);
