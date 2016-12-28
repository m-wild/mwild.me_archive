const Metalsmith = require('metalsmith');
const layouts    = require('metalsmith-layouts');
const less       = require('less');

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    //.clean(false)
    .use(metalsmithLess)
    .use(layouts({engine: 'handlebars'}))
    .build(function(err) {
        if (err) throw err;
    });



// convert all .less files to .css
function metalsmithLess(files, metalsmith, done) {
    return Promise.all(
        Object.keys(files)
        .filter(file => file.endsWith('.less'))
        .map(file => 
            less.render(files[file].contents.toString())
                .then(cb => {
                    files[file.replace('\.less', '.css')] = {
                        contents: new Buffer(cb.css)
                    };
                })
                .then(() => {
                    delete files[file];
                })
    ))
    .catch(err => done(err))
    .then(() => done(null));
}
