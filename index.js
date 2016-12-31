const Metalsmith = require('metalsmith');
const layouts    = require('metalsmith-layouts');
const express    = require('metalsmith-express');
const watch      = require('metalsmith-watch');
const less       = require('./lib/metalsmith-less');

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    .use(less())
    .use(layouts({engine: 'handlebars'}))
    .use(express())
    .use(watch({livereload:true}))
    .build(function(err) {
        if (err) throw err;
    });



