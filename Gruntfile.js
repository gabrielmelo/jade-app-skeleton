module.exports = function(grunt) {
    //    Informa o tempo de execução das tarefas do grunt
    require('time-grunt')(grunt);

    //    Carrega todos modulos do grunt no package.json
    require('load-grunt-tasks')(grunt);

    var packageFile = grunt.file.readJSON('package.json');

    // var mozjpeg = require('imagemin-mozjpeg');

    /*
     * ------------------------------------------------------
     * Gera a string com os autores do projeto
     * ------------------------------------------------------
     */
    var authors   = "";

    for( i in packageFile.authors ){
        if( authors == "" ){
            authors = packageFile.authors[i];
        }else{
            authors = authors+"\n\t  "+packageFile.authors[i];
        }
    }

    //  Banners dos arquivos
    var hr = '----------------------------------------------------\n';
    var bannerFiles = '/*\n' +
        hr+
        'Gabriel Melo - Jade App Skeleton\n' +
        hr+
        'projeto\t: <%= pkg.name %>\n' +
        'versao\t: <%= pkg.version %>\n' +
        'data\t: <%= grunt.template.today("dd/mm/yyyy HH:MM:ss") %>\n' +
        'autores\t: <%= authors %>\n' +
        hr+
         '*/\n';

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
                    dest: '/build',
                    ext: '.html'
                }]
            }
        },

        // connect
        connect: {
            build: {
                options: {
                    port: 9000,
                    base: '/build',
                    open: true,
                    livereload: true
                }
            }
        }
    });

    // Tarefa(s) padrão
    grunt.registerTask('default', ['jade', 'connect:build','watch']);
};
