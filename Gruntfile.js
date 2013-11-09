module.exports = function(grunt) {

    grunt.initConfig({
        compass: {
            dist: {
                options: {
                    sassDir: 'src/scss',
                    cssDir: 'build/css'
                    }
                }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('default', ['compass:dist']);

}
