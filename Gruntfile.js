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


      // SCSS
      compass: {
        dev: {
          options: {
            config: 'config.rb',
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

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      compass: {
        files: 'scss/**/*.scss',
        tasks: ['compass:dev', 'pleeease']
      },

      imagemin: {
        files: 'images/**/*.{png,jpg,gif}',
        tasks: ['imagemin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-pleeease');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('build', [
    'svgmin',
    'grunticon',
    'imagemin',
    'compass:dev',
    'pleeease'
  ]);
  grunt.registerTask('default', ['build','watch']);
}
