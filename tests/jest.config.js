import { defineConfig } from "jest";

export default defineConfig({
	testEnvironment: "node",
	collectCoverageFrom: [
		"../**/*.js",
		"./*.test.js",
	],
	coverageThreshold: {
		branches: 80,
		statements: 80,
		functions: 80,
		lines: 80,
	},
});
