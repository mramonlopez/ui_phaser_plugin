// Generated on 2014-03-28 using generator-phaser-official 0.0.8-rc-2
'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        clean: {
            build: ['build']
        },
        open: {
            server: {
                path: 'http://localhost:8080'
            }
        },
        concat: {
            options: {
                stripBanners: false,
                banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                separator: '\n\n\n'
            },
            dist: {
                src: ['src/UI.js', 'src/TextBox.js'],
                dest: 'plugin/UI.js',
            },
        },
        copy: {
            plugin: {
                files: [
                    {expand: true, flatten: true, cwd: 'plugin', src: ['UI.js'], dest: 'example/www/js/plugins/'}
                ]
            },  
            example: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, cwd: 'example', src: ['css/**'], dest: 'example/www/'},
                    {expand: true, cwd: 'example', src: ['assets/**'], dest: 'example/www/'},
                    {expand: true, cwd: 'example', src: ['index.html'], dest: 'example/www/'},
                    {expand: true, flatten: true, cwd: 'example', src: ['node_modules/phaser/dist/*.js'], dest: 'example/www/js/'}
                ]
            }
        },
        browserify: {
            example: {
                src: ['example/game/main.js'],
                dest: 'example/www/js/game.js'
            }
        },
        watch: {
            source: {
                files: ["./src/**/*.js", "./example/game/**/*.js"],
                tasks: ['example'],
                options: {
                    livereload: true
                }

            }
        },
        connect: {
          server: {
            options: {
              port: 8080,
              // Change this to '0.0.0.0' to access the server from outside.
              hostname: '0.0.0.0',
              base: 'example/www'
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build', ['concat']);
    grunt.registerTask('example', ['build', 'clean:build', 'browserify', 'copy']);
    grunt.registerTask('default', ['example', 'connect', 'open', 'watch']);
    //grunt.registerTask('prod', ['build', 'copy']);
};
