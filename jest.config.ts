import type { Config } from "jest";
const config: Config = {
	preset: "ts-jest/presets/default-esm",
	transform: {
		"^.+\\.(t|j)sx?$": [
			"ts-jest",
			{
				// useESM: true,
				tsconfig: "test/tsconfig.json"
			}
		]
	},
	testRegex: "/test/.*\\.(test|spec)\\.(ts|tsx|js)$",
	testEnvironment: "node",
	// testEnvironment: "miniflare",
	// testEnvironmentOptions: {
	// 	scriptPath: "./src/index.ts",
	// 	modules: true
	// },
};

export default config;
