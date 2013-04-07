'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },
    regarde: {
      all: {
        files: ['**/*'],
        tasks: ['livereload']
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        smarttabs: true,
        globals: {
          jQuery: true,
          angular: true,
          console: true,
          $: true
        }
      },
      files: ['angular-notify.js']
    },
    jasmine: {
      unit: {
        src: [''],
        options: {
          specs: 'test/unit/*.js'
        }
      }
    },
    copy: {
      main: {
        files: [
          {src:'angular-*.*',dest:'dist/'}
        ]
      }
    },
    uglify: {
      main: {
        files: [
          {src:'angular-notify.js',dest:'dist/angular-notify.min.js'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('server', ['livereload-start','jshint','connect', 'regarde']);
  grunt.registerTask('build',['copy','uglify']);

};