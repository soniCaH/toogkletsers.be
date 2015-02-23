module.exports = function(grunt) {
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

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },

    pleeease: {
        custom: {
          options: {
            "browsers": ["ie 8"],
            autoprefixer: {'browsers': ['last 4 versions', 'ios 6']},
            filters: {'oldIE': true},
            minifier: false,
            pseudoElements: true,
            opacity: true,
            mqpacker: true,
            calc: true,
            colors: true
          },
          files: {
            '<%= project.root %>/css/app.css': '<%= project.root %>/css/app.css',
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
            src: ['<%= project.root %>/_assets/images/**/*.{png,jpg,gif,jpeg}']
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
              dest: '<%= project.root %>/_assets/images/svgmin'
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
              cwd: '<%= project.root %>/_assets/images/svgmin/icons',
              src: ['**/*.svg'],
              dest: '<%= project.root %>/_assets/images/icons'
            }
          ]
        }
      },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },

      imagemin: {
        files: '_assets/images/**/*.{png,jpg,gif}',
        tasks: ['imagemin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-pleeease');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('build', [
    'svgmin',
    'grunticon',
    'imagemin',
    'sass',
    'pleeease'
  ]);
  grunt.registerTask('default', ['build','watch']);
}
