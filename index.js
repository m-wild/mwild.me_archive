const Metalsmith = require('metalsmith');
const Autoprefix = require('less-plugin-autoprefix');
const express   = require('metalsmith-express');
const msIf      = require('metalsmith-if');
const watch     = require('metalsmith-watch');
const less      = require('metalsmith-lesser');
const pug       = require('metalsmith-pug');

const argv = require('minimist')(process.argv.slice(2));

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(less({
    copySource: false,
    lessOptions: {
      plugins: [new Autoprefix({browsers: ["last 2 versions"]})]
    }
  }))
  .use(pug({pretty:true}))
  .use(msIf(argv.watch, 
    express()))
  .use(msIf(argv.watch, 
    watch({livereload: argv.watch}))) // have to double barrel this..
  .build(function(err) {
      if (err) throw err;
  });



