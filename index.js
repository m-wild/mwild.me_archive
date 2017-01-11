const Metalsmith  = require('metalsmith');
const collections = require('metalsmith-collections');
const dates       = require('metalsmith-date-in-filename');
const disqus      = require('metalsmith-disqus');
const express     = require('metalsmith-express');
const msIf        = require('metalsmith-if');
const layouts     = require('metalsmith-layouts');
const less        = require('metalsmith-less');
const markdown    = require('metalsmith-markdown');
const metallic    = require('metalsmith-metallic');
const permalinks  = require('metalsmith-permalinks');
const watch       = require('metalsmith-watch');

const argv = require('minimist')(process.argv.slice(2));

Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'mwild',
      baseurl: '/blog',
      url: 'https://mwild.me'
    }
  })
  .source("./src")
  .destination("./build")
  .use(less())
  .use(dates())
  .use(collections({
    posts: {
      pattern: '**/posts/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(metallic())
  .use(markdown({
    gfm: true,
    smartypants: true
  }))
  .use(permalinks({ // must be after markdown
    pattern: ':title'
  }))
  .use(layouts({
    engine: 'pug'
  }))
  .use(disqus({
    siteurl: 'https://mwild.me/blog/',
    shortname: 'mwild'
  }))
  .use(msIf(argv.watch, 
    express()))
  .use(msIf(argv.watch, 
    watch({livereload: argv.watch}))) // have to double barrel this..
  .build(function(err) {
    if (err) throw err;
  });
