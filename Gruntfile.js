module.exports = function(grunt) {
    //    Informa o tempo de execução das tarefas do grunt
    require('time-grunt')(grunt);

    //    Carrega todos modulos do grunt no package.json
    require('load-grunt-tasks')(grunt);

    var packageFile = grunt.file.readJSON('package.json');

    //  Configurações das Tasks
    grunt.initConfig({
        pkg: packageFile,
        authors: authors,

        //  watch
        watch: {
            options: {
                livereload: true
            },
           
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade']
            }
        },

        // jade
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'views',
                    src: [ '**/*.jade' ],
                    dest: 'test',
                    ext: '.html'
                }]
            }
        },

        // connect
        connect: {
            build: {
                options: {
                    port: 9000,
                    base: {
                        path: 'test/',
                        options: {
                            index: 'home.html',
                            maxAge: 300000
                        }
                    },
                    open: true,
                    hostname: '*',
                    livereload: true
                }
            }
        }
    });

    // Tarefa(s) padrão
    grunt.registerTask('test', ['jade', 'connect:build','watch']);
};
