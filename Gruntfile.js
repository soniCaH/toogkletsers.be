module.exports = function (grunt) {
  var mozjpeg = require('imagemin-mozjpeg');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project object
     *
     * Variables:
     * <%= project.root %> : The root path of the project.
     */
    project: {
      root: './'
    },


    // SCSS
    compass: {
      dev: {
        options: {
          config: 'config.rb',
          sourcemap: true,
          outputStyle: 'expanded',
          debugInfo: true,
          environment: 'development',
          sassDir: '<%= project.root %>/scss',
          cssDir: '<%= project.root %>/css'
        }
      },
      prod: {
        options: {
          config: 'config.rb',
          outputStyle: 'compressed',
          debugInfo: false,
          environment: 'production',
          sassDir: '<%= project.root %>/scss',
          cssDir: '<%= project.root %>/css'
        }
      }
    },

    pleeease: {
      custom: {
        options: {
          'browsers': ['last 2 versions'],
          autoprefixer: {'browsers': ['ie 6', 'last 4 versions']},
          pseudoElements: true,
          opacity: true,
          minifier: false,
          mqpacker: true,
        },
        files: {
          '<%= project.root %>/css/app.css': '<%= project.root %>/css/app.css'
        }
      }
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 5,
          svgoPlugins: [{removeViewBox: true}],
          use: [mozjpeg()]
        },
        files: [{
          expand: true,
          src: ['<%= project.root %>/images/**/*.{png,jpg,gif,jpeg}']
        }]
      }
    },


    // SVG Minification
    svgmin: {
      multiple: {
        files: [
          {
            expand: true,
            cwd: '<%= project.root %>/_assets/images/svg/',
            src: ['**/*.svg'],
            dest: '<%= project.root %>/images/svgmin'
          }
        ]
      }
    },

    // SVG Fallback
    grunticon: {
      icons: {
        files: [
          {
            expand: true,
            cwd: '<%= project.root %>/images/svgmin/icons',
            src: ['**/*.svg'],
            dest: '<%= project.root %>/images/icons'
          }
        ]
      }
    },

    // JS
    uglify: {
      options: {
        report: 'min'
      },
      app: {
        files: {
          '<%= project.root %>/js/app.min.js': [
            '<%= project.root %>/bower_components/jquery/dist/jquery.min.js',
            '<%= project.root %>/bower_components/modernizr/modernizr.js',
            '<%= project.root %>/bower_components/foundation/js/foundation.min.js',
            '<%= project.root %>/bower_components/foundation/js/foundation/foundation.interchange.js',
            '<%= project.root %>/_assets/js/isotope.js',
            '<%= project.root %>/_assets/js/isotope-packery-mode.js',
            '<%= project.root %>/_assets/js/app.js',
          ]
        }
      }
    },


    // Automate some tasks during development (if files change).
    watch: {
      svg: {
        files: ['<%= project.root %>/images/svg/**/*.svg'],
        tasks: ['svgmin', 'grunticon', 'compass:dev', 'pleeease'],
        options: {
          livereload: true
        }
      },

      style: {
        files: [
          '<%= project.root %>/scss/*.scss',
          '<%= project.root %>/scss/**/*.scss'
        ],
        tasks: ['compass:dev', 'pleeease'],
        options: {
          livereload: true
        }
      },

      scripts: {
        files: ['<%= project.root %>/_assets/js/*.js'],
        tasks: ['uglify:app'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-pleeease');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('build', [
    'svgmin',
    'grunticon',
    // 'imagemin',
    'compass:dev',
    'pleeease',
    'uglify'
  ]);

  grunt.registerTask('default', ['build', 'watch']);
}
