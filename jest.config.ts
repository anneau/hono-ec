import type { Config } from "jest";

const config: Config = {
  testMatch: [
    "**/test/**/*.+(ts|tsx|js)",
    "**/src/**/(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testEnvironment: "miniflare",
  testEnvironmentOptions: {},
};

export default config;
