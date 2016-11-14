/*jslint node: true */
'use strict';

var pkg = require('./package.json');
var localSettings = require('./local-settings.json');

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function (fileTypePatterns) {
    fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
    var ignore = ['node_modules', 'bower_components', 'dist', 'temp'];
    var fs = require('fs');
    return fs.readdirSync(process.cwd())
        .map(function (file) {
            if (ignore.indexOf(file) !== -1 ||
                file.indexOf('.') === 0 || !fs.lstatSync(file).isDirectory()) {
                return null;
            } else {
                return fileTypePatterns.map(function (pattern) {
                    return file + '/**/' + pattern;
                });
            }
        })
        .filter(function (patterns) {
            return patterns;
        })
        .concat(fileTypePatterns);
};

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var assets = {
      "staticAssets": {
        "global": {
          "js": [
            "temp.js"
          ],
          "css": [
            "temp.css"
          ]
        }
      }
    };

    if (grunt.file.isFile('./dist/assets.config.json')) {
        assets = require('./dist/assets.config.json');
    }

    // Project configuration.
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporterOutput: ''
            },
            main: {
                src: createFolderGlobs('*.js'),
            }
        },
        clean: {
            before: {
                src: ['dist', 'temp']
            },
            after: {
                src: ['temp']
            }
        },
        less: {
            production: {
                options: {},
                files: {
                    'temp/app.css': 'app.less'
                }
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: pkg.name,
                    htmlmin: '<%= htmlmin.main.options %>'
                },
                src: [createFolderGlobs('*.html'), '!index.html', '!_SpecRunner.html'],
                dest: 'temp/templates.js'
            }
        },
        copy: {
            main: {
                files: [{
                        src: ['assets/img/**'],
                        dest: 'dist/'
                    },{
                        src: 'local-settings.json',
                        dest: 'dist/'
                    },{
                        src: '.htaccess',
                        dest: 'dist/'
                    },{
                        src: '**/*',
                        dest: 'fonts/',
                        cwd:'bower_components/bootstrap/fonts/',
                        expand: true
                    },{
                        src: 'translation/*',
                        dest: 'dist/'
                    }
                ]
            }
        },
        dom_munger: {
            read: {
                options: {
                    read: [{
                        selector: 'script[data-concat!="false"]',
                        attribute: 'src',
                        writeto: 'appjs'
                    }, {
                        selector: 'link[rel="stylesheet"][data-concat!="false"]',
                        attribute: 'href',
                        writeto: 'appcss'
                    }]
                },
                src: 'index.html'
            },
            'update-versioned': {
                options: {
                    remove: ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    append: [{
                        selector: 'body',
                        html: '<script src="' + localSettings.httpsUrl + assets.staticAssets.global.js + '"></script>'
                    },{
                        selector: 'head',
                        html: '<link rel="stylesheet" href="' + localSettings.httpsUrl + assets.staticAssets.global.css + '">'
                    }, {
                        selector: 'head',
                        html: '<link rel="icon" href="//d13a9k2cw5p3go.cloudfront.net/img/favicon.png" type="image/png"/>'
                    },{
                        selector: 'head',
                        html: '<link rel="apple-touch-icon" href="//d13a9k2cw5p3go.cloudfront.net/img/apple-touch-icon.png" type="image/png"/>'
                    },{
                        selector: 'head',
                        html: '<link rel="apple-touch-icon" sizes="114x114"' +
                              'href="//d13a9k2cw5p3go.cloudfront.net/img/apple-touch-icon-114x114-precomposed.png"' +
                              'type="image/png"/>'
                    }]
                },
                src: 'index.html',
                dest: 'dist/index.html'
            },
            update: {
                options: {
                    remove: ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    append: [{
                        selector: 'body',
                        html: '<script src="app.full.min.js"></script>'
                    },{
                        selector: 'head',
                        html: '<link rel="stylesheet" href="app.full.min.css">'
                    }, {
                        selector: 'head',
                        html: '<link rel="icon" href="//d13a9k2cw5p3go.cloudfront.net/img/favicon.png" type="image/png"/>'
                    },{
                        selector: 'head',
                        html: '<link rel="apple-touch-icon" href="//d13a9k2cw5p3go.cloudfront.net/img/apple-touch-icon.png" type="image/png"/>'
                    },{
                        selector: 'head',
                        html: '<link rel="apple-touch-icon" sizes="114x114"' +
                              'href="//d13a9k2cw5p3go.cloudfront.net/img/apple-touch-icon-114x114-precomposed.png"' +
                              'type="image/png"/>'
                    }]
                },
                src: 'index.html',
                dest: 'dist/index.html'
            }
        },
        cssmin: {
            main: {
                src: ['temp/app.css', '<%= dom_munger.data.appcss %>'],
                dest: 'dist/app.full.min.css'
            }
        },
        concat: {
            main: {
                src: ['<%= dom_munger.data.appjs %>', '<%= ngtemplates.main.dest %>'],
                dest: 'temp/app.full.js'
            }
        },
        ngmin: {
            main: {
                src: 'temp/app.full.js',
                dest: 'temp/app.full.js'
            }
        },
        uglify: {
            main: {
                src: 'temp/app.full.js',
                dest: 'dist/app.full.min.js'
            },
            options: {
                mangle: false
            },
        },
        versioning: {
            options: {
                outputConfigDir: 'dist'
            },
            main: {
                files: [{
                    assets: [{
                        src: ['dist/app.full.min.js'],
                        dest: 'dist/app.full.min.js'
                    }],
                    key: 'global',
                    dest: 'dist/versioned',
                    type: 'js',
                    ext: '.min.js'
                },
                {
                    assets: [{
                        src: ['dist/app.full.min.css'],
                        dest: 'dist/app.full.min.css'
                    }],
                    key: 'global',
                    dest: 'dist/versioned',
                    type: 'css',
                    ext: '.min.css'
                }
                ]
            },
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        imagemin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/{*.png,*.jpg}'],
                    dest: 'dist/'
                }]
            }
        },

    });

    grunt.registerTask('build', [
        'jshint',
        'clean:before',
        'less',
        'dom_munger:read',
        'ngtemplates',
        'cssmin',
        'concat',
        'ngmin',
        'uglify',
        'versioning',
        'copy',
        'htmlmin',
        'imagemin',
        'dom_munger:update',
        'clean:after'
    ]);

    grunt.registerTask('build-versioned', [
        'dom_munger:update-versioned'
    ]);
};
