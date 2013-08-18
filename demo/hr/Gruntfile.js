module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['*','css/*'],
      options: {
        livereload: true
      }
    },
    connect: {
      server: {
          options: {
            port: 9010,
            keepalive: true
          }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
};