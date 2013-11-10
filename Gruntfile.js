module.exports = function (grunt) {

  path = require("path");

  var PATH = {
    BUILD: {
      VISUAL: 'build/tests/visual',
      APP: 'build/js/shoropleth.js',
      VIEWS: 'build/js/views',
      VIEWS_APP: 'build/tests/visual/js/app.js'
    },
    SRC: {
      VISUAL: 'tests/visual',
      VIEWS_APP: 'tests/visual/js/modules',
      VISUAL_APP_CONFIG: 'tests/visual/config/rjs.config.js',
      DIST_APP_CONFIG: 'src/config/rjs.config.js'
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

  var getJadeDistFiles = function() {
    return grunt.file.expandMapping(['**.jade'], PATH.BUILD.VIEWS, {
      cwd: 'src/jade',
      rename: function (destBase, destPath) {
        return path.join(destBase, destPath.replace(/\.jade$/, '.js'));
      }
    });
  }

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
    copy: {
      data: {
        files: [
          {
            expand: true,
            cwd: 'data/topo',
            src: ['**'],
            dest: path.join(PATH.BUILD.VISUAL, 'data')
          }
        ]
      },
      visual: {
        files: [
          {
            expand: true,
            cwd: path.join(PATH.SRC.VISUAL, "js", "config"),
            src: ["**"],
            dest: path.join(PATH.BUILD.VISUAL, "js", "config")
          },
          {
            expand: true,
            cwd: path.join(PATH.SRC.VISUAL, "js", "third-party"),
            src: ["**"],
            dest: path.join(PATH.BUILD.VISUAL, "js", "third-party")
          }
        ]
      }
    },
    jade: {
      dist: {
        options: {
          client: true,
          amd: true,
          namespace: false
        },
        files: getJadeDistFiles()
      },
      visual: {
        options: {
          data: {}
        },
        files: getJadeVisualFiles()
      }
    },
    requirejs: {
      dist: {
        options: {
          baseUrl: "src/js/modules",
          //generateSourceMaps: true,
          //preserveLicenseComments: false,
          optimize: "none",
          name: "shoropleth",
          out: PATH.BUILD.APP,
          //mainConfigFile: PATHS.REQUIREJS_CONFIG,
          useStrict: true,
          paths: {
            "views":  PATH.BUILD.VIEWS
          },
          mainConfigFile: PATH.SRC.DIST_APP_CONFIG
        }
      },
      visual: {
        options: {
          baseUrl: PATH.SRC.VIEWS_APP,
          //generateSourceMaps: true,
          //preserveLicenseComments: false,
          optimize: "none",
          name: "app",
          out: PATH.BUILD.VIEWS_APP,
          mainConfigFile: PATH.SRC.VISUAL_APP_CONFIG,
          useStrict: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dist', ['copy:data', 'compass:dist', 'jade:dist', 'requirejs:dist']);
  grunt.registerTask('visual', ['copy:visual', 'jade:visual', 'compass:visual', 'requirejs:visual']);

  grunt.registerTask('default', ['dist', 'visual']);

}
