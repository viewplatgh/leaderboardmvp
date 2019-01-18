module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/*.(test|spec).(js|jsx|ts|tsx)"],
  coveragePathIgnorePatterns: ["/node_modules/", "jest.setup.js"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupTestFrameworkScriptFile: "<rootDir>/jest.setup.js",
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/mocks.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/mocks.js"
  }
};
