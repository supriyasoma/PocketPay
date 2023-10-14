module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "!src/utils/*.{ts,tsx}",
    "!src/components/**/*.{types,stories,constants,test,spec}.{ts,tsx}",
    "!src/declare.d.ts",
    "!src/react-app-env.d.ts",
    "!src/index.tsx",
    "!src/index.css",
    "!src/theme/theme.ts",
    "!src/store/*.{ts,tsx}"
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^.+\\.(svg|gif|png|css)$": "jest-svg-transformer",
    "/src/(.*)": "<rootDir>/src/$1"
  },
};
