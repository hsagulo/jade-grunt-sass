/*
Usage
--------------
# run build tasks is build_state (default dev)
# start watching for changes and build on changes
grunt


# build with compressed html, css and js
# does NOT start watch
grunt prod

Project Setup
--------------
# install grunt for this project (generates ./node_modules)
# run from within this directory
npm install

# NOTE: Machine Setup (heading below) must have occurred
# at least once previously on this machine


Machine Setup
--------------
# install nodejs from
http://nodejs.org/download/

# from the command line install grunt cli
sudo npm install -g grunt-cli

# from the commdand line install sass
- sudo gem install sass
- npm install --save-dev grunt-sass

*/


// we can set our default build state to either
// 'prod' or 'dev'
// this value will be used for both the
// initial process when `grunt` alone is run
// as well as the tasks run via watch
var build_state = 'prod',
    // sass src files are loaded with sass includes
    // no need to list them here (i.e. only one sass src)
    sass_files = {
        "build/style/style.min.css": "app/sass/style.scss"
    },
    // watch all .scss files in our sass directory
    // for changes
    watched_sass_files = [ 'app/sass/**/*.scss' ],
    uglify_source_files = [
        'app/js/**/*.js',
        'app/js/app.js',
    ],
    uglify_files = {
        'build/js/app.min.js': uglify_source_files
    },

    watched_js_files = [
        'app/js/**/*.js',
        'app/js/*.js',
    ];




module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            jobs: grunt.file.readJSON('data.json')
          }
        },
        files: {
          "build/index.html": "app/views/jobs.jade",
          "build/works/rabbitfoot-photography.html": "app/views/works-rabbitfoot.jade",
          "build/works/angelajaboro.html": "app/views/works-angelajaboro.jade",
          "build/works/penandink.html": "app/views/works-penandink.jade",
          "build/works/arrow-marketing.html": "app/views/works-arrow.jade",
          "build/works/dalthan-printing.html": "app/views/works-dalthanprinting.jade",
          "build/works/slimming-lida.html": "app/views/works-lida.jade",
          "build/works/kyleborn.html": "app/views/works-kyleborn.jade",
          "build/works/kylebitterman.html": "app/views/works-bitterman.jade",
          "build/works/homework.html": "app/views/works-homework.jade",
          "build/works/mxzen.html": "app/views/works-mxzen.jade",
          "build/about.html": "app/views/page-about.jade",
          "build/works.html": "app/views/page-works.jade",
          "build/reviews.html": "app/views/page-reviews.jade",
          "build/thanks.html": "app/views/page-thanks.jade"
        }
      }
    }, //jade

    copy: {
      build: {
        cwd: 'app',
        src: [ '!js/*','style/*', '!**/*.jade' ],
        dest: 'build',
        expand: true
      }
    }, //copy


    watch: {
		  grunt: { files: ['Gruntfile.js'] },
		  jade: {
		    files: 'app/views/**/*.jade',
		    tasks: ['jade']
		  },
      sass: {
        files: watched_sass_files,
        tasks: ["sass:"+build_state],
        options: {
            livereload: true
        }
      },
      js: {
        files: watched_js_files,
        tasks: ["uglify:"+build_state],
        options: {
            livereload: true
        }
      }
		}, //watch

    uglify: {
      // `grunt uglify:dev`
      dev: {
          files: uglify_files,
          options: {
            beautify: false,
            mangle: false,
            expand: true,    // allow dynamic building
            flatten: true   // remove all unnecessary nesting
          },
      },

      // `grunt uglify:prod`
      prod: {
          files: uglify_files
      },
      releaseUnmin: {
          files: {
              'app/js/app.js': uglify_source_files,
          },
          options: {
              beautify: true,
              mangle: false
          }
      }
    }, // uglify

    sass: {
      // `grunt sass:dev`
      dev: {
          options: { outputStyle: "nested" },
          files: sass_files,
      },
      // `grunt sass:prod`
      prod: {
          options: { outputStyle: "compressed" },
          files: sass_files,
      },
      releaseUnmin: {
          options: { style: "normal" },
          files: {
              "build/style/style.min.css": "app/sass/style.scss"
          },
      }
    }, // sass

		connect: {
      server: {
        options: {
          port: 8000,
          base: 'build',
          hostname: '*'
        }
      }
    }, // contact

  });


  // when `grunt` is run, do the following tasks
  // run all tasks associated with build_state
  // (either prod or dev), start watch
  // (note: watch also uses build_state when generating output)
  
  grunt.registerTask('default', [build_state, 'watch']);

  // when `grunt prod` is run, do the following tasks
  grunt.registerTask('prod', ['sass:prod', 'uglify:prod']);

  // when `grunt dev` is run, do the following tasks
  grunt.registerTask('dev', ['sass:dev', 'uglify:dev']);


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task.
  grunt.registerTask('default',"Convert Jade templates into html templates", ['jade', 'copy' ,'connect','watch']);

}



