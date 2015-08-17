exports.config = {
  allScriptsTimeout: 11000,

  specs: ['test/protractor/*.js'],

  capabilities: {
    'browserName': 'chrome'
  },

  chromeDriver: 'node_modules/protractor/selenium/chromedriver',
  seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  baseUrl: 'http://localhost:9001/demo/index.html',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};

