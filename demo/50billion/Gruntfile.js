module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.config.init({
    transport: {
        options: {
          alias: {
            "jquery": "ext/jquery-1.11.1.min"
          }
        },
        main: {
          files: [{
            expand: true,
            src: ['./assets/js/modules/**/*.js', './assets/js/main.js'],
            dest: './.tmp/'
          }]
        }
    },
    concat: {
      dev: {
        options: {
          include: 'relative'
        },
        files: {
          'dist/assets/js/main.js': 
          ['.tmp/assets/js/main.js'],
        }
      }
    },
    usemin:{
      options: {
        assetsDirs: ['dist/views/', 'dist/assets/css/']
      },
      css:['dist/assets/css/*.css'],
      html:['dist/sample/*.html']
    },
    uglify: {
      my_target: {
        files: {
          'dist/assets/js/main-min.js': ['dist/assets/js/main.js']
        }
      }
    },
    copy:{
      sample: {
        expand: true,
        cwd: 'sample/',
        src: '*',
        dest: 'dist/sample/'
      },
      img: {
          expand: true,
          cwd: 'assets/img/',
          src: '**/*',
          dest: 'dist/assets/img/'
      },
      ext: {
        expand: true,
        cwd: 'assets/js/ext/',
        src: '**/*',
        dest: 'dist/assets/js/ext/'
      },
      seajs: {
        expand: true,
        cwd: 'assets/js/',
        src: 'sea.js',
        dest: 'dist/assets/js/'
      }
    },
    oversprite: {
      all: {
        spritelist: [
          {
            'src': [ 'dist/assets/img/slice/*.png' ],
            'dest': 'dist/assets/img/sprite.png',
            'algorithm': 'binary-tree',
            'padding': 1,
            'engine': 'auto',
            'exportOpts': {
                'format': 'png'
            }
          }
        ],
        csslist: [
          {
            'src':  'dist/assets/css/style.min.css',
            'dest': 'dist/assets/css/style.min.css',
          }
        ]
      }
    },
    filerev:{
      options: {
          encoding: 'utf8',
          algorithm: 'md5',
          length: 8
      },
      images: {
          src: ['dist/assets/css/*.css', 'dist/assets/img/*.{jpg,jpeg,gif,png}', 'dist/assets/js/modules/*.js', 'dist/assets/js/main-min.js']
      }
    },
    clean:{
        dist: ["dist"],
        tmp: ["./.tmp"],
        slice: ["dist/assets/img/slice"]
    },
    connect: {
      server: {
          options: {
            port: 9011,
            keepalive: true,
            hostname: "*"
          }
        }
    },
    watch: {
      files: ['views/**/*', 'sample/*.html', 'assets/css/*.css', 'assets/js/**/*.js'/*, 'assets/less/*.less'*/],
      tasks: [
      'shell'],
      options: {
        livereload: true
      }
    },
    cdn: {
      html: {
          options: {
              // cdn: '//resource.xiaomi.net/miuimarket/app/hd/5billion/',
              cdn: '../',
              flatten: true,
              supportedTypes: { 'jsp': 'html' }
          },
          src: ['./dist/views/*.jsp', './dist/sample/*.html'] 
      },
      css: {
          options: {
              // cdn: '//resource.xiaomi.net/miuimarket/app/hd/5billion/',
              cdn: '../',
              flatten: true
          },
          src: ['./dist/**/*.css']  
      }
    },
    cssmin: {
      combine: {
        files: {
          'dist/assets/css/style.min.css': ['assets/css/style.css', 'assets/css/sprite.css']
        }
      }
    },
  });

  grunt.registerTask('default',[
      'clean:dist',
      'transport',
      'copy',
      'concat',
      'uglify',
      'cssmin',
      'oversprite',
      'filerev',
      'usemin',
      'cdn',
      'clean:tmp',
      'clean:slice'
  ]);
}

