module.exports = function(grunt) {

  path = require("path");

  var getJadeVisualFiles = function() {
    return grunt.file.expandMapping(['index.jade'], 'build/tests/visual', {
      cwd: 'tests/visual/jade',
      rename: function(destBase, destPath) {
        return path.join(destBase, destPath.replace(/\.jade$/, '.html'));
      }
    });
 };

  grunt.initConfig({
        compass: {
            dist: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'build/css'
                    }
                }
        },
        jade: {
          visual: {
            options: {
              data:{}
            },
            files: getJadeVisualFiles()
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('visual', ['jade:visual']);

    grunt.registerTask('default', ['compass:dist', 'visual']);

}
