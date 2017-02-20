const Metalsmith  = require('metalsmith');
const Autoprefix  = require('less-plugin-autoprefix');
const collections = require('metalsmith-collections');
const dates       = require('metalsmith-date-in-filename');
const disqus      = require('metalsmith-disqus');
const express     = require('metalsmith-express');
const msIf        = require('metalsmith-if');
const layouts     = require('metalsmith-layouts');
const less        = require('metalsmith-lesser');
const markdown    = require('metalsmith-markdown');
const metallic    = require('metalsmith-metallic');
const permalinks  = require('metalsmith-permalinks');
const pug         = require('metalsmith-pug');
const watch       = require('metalsmith-watch');

const argv = require('minimist')(process.argv.slice(2));

Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'mwild'
  }})
  .source('./src')
  .destination('./build')

  // 1. --- do non-blog related stuff
  .use(less({
    copySource: false,
    lessOptions: {
      plugins: [new Autoprefix()]
  }}))
  .use(pug()) // pug should be before markdown (because we use layouts{engine:pug}, md gets converted to pug)

  // 2. --- then blog stuff
  .use(dates())
  .use(collections({
    posts: {
      pattern: '**/blog/posts/**/*.md',
      sortBy: 'date',
      reverse: true
  }}))
  .use(metallic({ // highlight.js -- must be before markdown -> needs to see the md ```
    languages: [] // disable lang autodetection, allows us to have 'plain text' code blocks
  }))
  .use(markdown({
    gfm: true,
    smartypants: true
  }))
  .use(permalinks({ // must be after markdown -> only works on .html
    pattern: 'blog/:title',
    relative: false // we use absolute paths for everything instead of duplicating files
  }))
  .use(layouts({
    engine: 'pug'
  }))

  // 3. --- then additions to blog posts
  .use(disqus({
    siteurl: 'https://mwild.me/blog/',
    shortname: 'mwild'
  }))
  
  // 4. --- watch
  .use(msIf(argv.watch, express()))
  .use(msIf(argv.watch, watch({
    livereload: argv.watch,
    paths: {
      '${source}/**/*': true, // each file reloads itself
      './layouts/**/*': '**/*' // layouts need to reload everything, which unfortunately breaks collections
  }})))
  // 5. --- finally, build the site
  .build(function(err) {
    if (err) throw err;
  });
