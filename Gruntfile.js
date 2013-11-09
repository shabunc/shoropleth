module.exports = function (grunt) {

  path = require("path");

  var PATH = {
    BUILD: {
      VISUAL: 'build/tests/visual'
    },
    SRC: {
      VISUAL: 'tests/visual'
    }
  }

  var getJadeVisualFiles = function () {
    return grunt.file.expandMapping(['index.jade'], PATH.BUILD.VISUAL, {
      cwd: 'tests/visual/jade',
      rename: function (destBase, destPath) {
        return path.join(destBase, destPath.replace(/\.jade$/, '.html'));
      }
    });
  };

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9001,
          base: PATH.BUILD.VISUAL,
          keepalive: true
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'build/css'
        }
      },
      visual: {
        options: {
          sassDir: path.join(PATH.SRC.VISUAL, 'scss'),
          cssDir: path.join(PATH.BUILD.VISUAL, 'css'),
          importPath: 'src/scss'
        }
      }
    },
    jade: {
      visual: {
        options: {
          data: {}
        },
        files: getJadeVisualFiles()
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('visual', ['jade:visual', 'compass:visual']);
  grunt.registerTask('dist', ['compass:dist']);

  grunt.registerTask('default', ['dist', 'visual']);

}
