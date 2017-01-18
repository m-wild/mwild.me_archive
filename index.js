const Metalsmith = require('metalsmith');
const express   = require('metalsmith-express');
const watch     = require('metalsmith-watch');
const less      = require('metalsmith-less');
const pug       = require('metalsmith-pug');

const argv = require('minimist')(process.argv.slice(2));

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(less())
  .use(pug({pretty:true}))
  .use(msIf(argv.watch, 
    express()))
  .use(msIf(argv.watch, 
    watch({livereload: argv.watch}))) // have to double barrel this..
  .build(function(err) {
      if (err) throw err;
  });



