const Metalsmith  = require('metalsmith');
const collections = require('metalsmith-collections');
const dates       = require('metalsmith-date-in-filename');
const layouts     = require('metalsmith-layouts');
const markdown    = require('metalsmith-markdown');
const metallic    = require('metalsmith-metallic');
const permalinks  = require('metalsmith-permalinks');
const sass        = require('metalsmith-sass');

Metalsmith(__dirname)
  .metadata({               // metadata variables are available in layout files
    site: {
      title: 'mwild'
    }
  })
  .source('./src')          // source directory
  .destination('./build')   // destination directory
  .clean(true)              // clean the destination directory before building
  .use(sass())              // transpile sass to css
  .use(dates())             // add dates to post metadata based on filenames
  .use(collections({        
    posts: {                // create a collection called 'posts' of every markdown file in the blog/posts folder
      pattern: '**/blog/posts/**/*.md',
      sortBy: 'date',       // order posts by dates from the filename
      reverse: true         // order in reverse
  }}))
  .use(metallic({           // highlight.js -- must be before markdown as it needs to see the md back-ticks: ```
    languages: []           // disable language auto-detection, allows us to have 'plain text' code blocks
  }))
  .use(markdown({           // convert markdown to HTML
    gfm: true,              // using github-flavoured-markdown
    smartypants: true       // converts ascii dashes, quotes etc, to their html equivalents
  }))
  .use(permalinks({         // change file paths to permanent URLs. must be after markdown as it only works on .html files
    pattern: 'blog/:title', // paths based on the page title. e.g. /blog/some-post
    relative: false         // prevent duplicating sibling files (e.g. css)
  }))
  .use(layouts())           // wrap layouts around html
  .build(function(err) {    // build the site!
    if (err) throw err;
  });
