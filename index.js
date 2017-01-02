const Metalsmith = require('metalsmith');
//const layout

var config = {
  "title": "mwild",
  "baseurl": "/blog",
  "url": "http://mwild.me",
  "permalink": "/:year/:title/",
  "images": "https://static.mwild.me/images"
};

Metalsmith(__dirname)
  .source("./src")
  .destination("./build")
  .build(function(err) {
    if (err) throw err;
  });
