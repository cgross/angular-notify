module.exports = function(config) {
  config.set({
    basePath: '',
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'angular-notify.js',
      'test/unit/**/*.js'
    ],
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'angular-notify.js': ['coverage']
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-jasmine',
      'karma-junit-reporter'
    ],
    coverageReporter: {
      reporters: [{
        type: 'html',
        subdir: 'report-html'
      }, {
        type: 'lcov',
        subdir: 'report-lcov'
      }]
    }
  });
};
