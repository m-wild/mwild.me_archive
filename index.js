const Metalsmith = require('metalsmith');
const express   = require('metalsmith-express');
const watch     = require('metalsmith-watch');
const less      = require('metalsmith-less');
const pug       = require('metalsmith-pug');

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    .use(less())
    .use(pug({pretty:true}))
    .use(express())
    .use(watch({livereload:true}))
    .build(function(err) {
        if (err) throw err;
    });



