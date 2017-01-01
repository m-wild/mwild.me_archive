const Metalsmith = require('metalsmith');
const layouts   = require('metalsmith-layouts');
const express   = require('metalsmith-express');
const watch     = require('metalsmith-watch');
const less      = require('./lib/metalsmith-less');
const pug       = require('metalsmith-pug');

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    .use(less())
    .use(pug())
    .use(layouts({engine: 'handlebars'}))
    .use(express())
    .use(watch({livereload:true}))
    .build(function(err) {
        if (err) throw err;
    });



