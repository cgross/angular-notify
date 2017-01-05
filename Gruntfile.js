'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      main: {
        options: {
          port: 9001
        }
      }
    },
    watch: {
      main: {
        options: {
            livereload: true,
            livereloadOnError: false,
            spawn: false
        },
        files: ['angular-notify.css','angular-notify.html','angular-notify.js','dist/**/*','demo/**/*'],
        tasks: ['jshint','build']
      }
    },
    jshint: {
      main: {
        options: {
            jshintrc: '.jshintrc'
        },
        src: 'angular-notify.js'
      }
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
          {src:'angular-notify.css',dest:'dist/'},
          {src:'index.js',dest:'dist/'}
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

  grunt.registerTask('serve', ['jshint','connect', 'watch']);
  grunt.registerTask('build',['ngtemplates','concat','uglify','copy','cssmin']);
  grunt.registerTask('test',['build','jasmine']);

};