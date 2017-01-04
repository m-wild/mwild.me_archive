const Metalsmith  = require('metalsmith');
const collections = require('metalsmith-collections');
const dates       = require('metalsmith-date-in-filename');
const express     = require('metalsmith-express');
const layouts     = require('metalsmith-layouts');
const less        = require('metalsmith-less');
const markdown    = require('metalsmith-markdown');
const metallic    = require('metalsmith-metallic');
const permalinks  = require('metalsmith-permalinks');
const watch       = require('metalsmith-watch');


Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'mwild',
      baseurl: '/blog',
      url: 'http://mwild.me',
      images: 'https://static.mwild.me/images'
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
    pattern: ':date/:title',
    date: 'YYYY'
  }))
  .use(layouts({
    engine: 'pug'
  }))
  .use(express())
  .use(watch({livereload:true}))
  .build(function(err) {
    if (err) throw err;
  });
