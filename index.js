const Metalsmith = require('metalsmith');
const layouts    = require('metalsmith-layouts');
const watch      = require('metalsmith-watch');
const serve      = require('metalsmith-serve');
const less       = require('./lib/metalsmith-less');

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    .use(less())
    .use(layouts({engine: 'handlebars'}))
    .use(serve())
    .use(watch())
    .build(function(err) {
        if (err) throw err;
    });



