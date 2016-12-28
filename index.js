const Metalsmith = require('metalsmith');
const layouts    = require('metalsmith-layouts');
const less       = require('metalsmith-less');

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    .use(less())
    .use(layouts({engine: 'handlebars'}))
    .build(function(err) {
        if (err) throw err;
    });