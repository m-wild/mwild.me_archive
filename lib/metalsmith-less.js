const less = require('less');

// convert all .less files to .css
function metalsmithLess() {
    return function plugin(files, metalsmith, done) {
        return Promise.all(
            Object.keys(files)
                .filter(file => file.endsWith('.less'))
                .map(file => 
                    less.render(files[file].contents.toString())
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