module.exports = function(grunt) {
    //  Informa o tempo de execução das tarefas do grunt
    require('time-grunt')(grunt);

    //  Carrega todos modulos do grunt no package.json
    require('load-grunt-tasks')(grunt);

    //  Configurações das Tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        //  watch
        watch: {
            pug: {
                files: ['**/*.pug'],
                tasks: ['pug']
            }
        },

        //  pug
        pug: {
            options: {
                data: function(dest, src) {
                    return require('data.json');
                }
            },
           
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'views',
                    src: [ '**/*.pug' ],
                    dest: '.test',
                    ext: '.html'
                }]
            }
        },

        //  connect
        connect: {
            build: {
                options: {
                    port: 9000,
                    base: {
                        path: '.test/',
                        options: {
                            index: 'index.html',
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
    grunt.registerTask('default', ['pug', 'connect:build','watch']);
};
