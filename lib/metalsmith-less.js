const less = require('less');
const autoprefix = require('less-plugin-autoprefix');

// convert all .less files to .css
function metalsmithLess() {
    return function plugin(files, metalsmith, done) {
        return Promise.all(
            Object.keys(files)
                .filter(file => file.endsWith('.less'))
                .map(file => 
                    less.render(files[file].contents.toString(), {plugins: [new autoprefix({browsers: ["last 2 versions"]})]})
                        .then(cb => {
                            files[file.replace('\.less', '.css')] = {contents: new Buffer(cb.css)};
                        })
                        .then(() => {
                            delete files[file];
                        })
            ))
            .catch(err => done(err))
            .then(() => done(null));
    }
}

module.exports = metalsmithLess;