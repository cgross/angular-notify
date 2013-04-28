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
          {src:'angular-notify.css',dest:'dist/'}
        ]
      }
    },
   ngtemplates: {
      main: {
        options: {
          module:'cgNotify',
          base:''
        },
        src:'angular-notify.html',
        dest: 'temp/templates.js'
      }
    },   
   concat: {
      main: {
        src: ['angular-notify.js', 'temp/templates.js'],
        dest: 'dist/angular-notify.js'
      }
    },    
    uglify: {
      main: {
        files: [
          {src:'dist/angular-notify.js',dest:'dist/angular-notify.min.js'}
        ]
      }
    },
    cssmin: {
      main: {
        files: {
          'dist/angular-notify.min.css': 'dist/angular-notify.css'
        }
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
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('server', ['livereload-start','jshint','connect', 'regarde']);
  grunt.registerTask('build',['copy','ngtemplates','concat','uglify','cssmin']);

};