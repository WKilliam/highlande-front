module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@angular/core$': '<rootDir>/node_modules/@angular/core',
    '^@angular/common$': '<rootDir>/node_modules/@angular/common',
    '^@angular/forms$': '<rootDir>/node_modules/@angular/forms',
    '^@angular/router$': '<rootDir>/node_modules/@angular/router',
    '^@angular/platform-browser$': '<rootDir>/node_modules/@angular/platform-browser',
    '^@angular/platform-browser-dynamic$': '<rootDir>/node_modules/@angular/platform-browser-dynamic',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx|ngx-socket-io)'],
};
