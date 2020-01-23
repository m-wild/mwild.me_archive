---
layout: post.pug
title: Reengineering this site
category: tech
excerpt: From Jekyll to Metalsmith
---


* The problems with Jekyll
    * Not cross platform (Windows)
    * Ruby dependency (a pain to manage if you don't use ruby for anything else)
    * Have to build the site locally if you want to use plugins (for GH pages)

* A better way?
    * Has to be able to run anywhere
    * Has to support build w/ watch & live reload
    * Has to autobuild and autodeploy

* Javascript?
* Metalsmith
    * Simple - by default it just copies files
    * Use Plugins to do anything meaningful
    * Many plugins available
    * Easy to write your own if you dont like the way something is done
        * metalsmith-lesser
            * metalsmith-less copies the .less files to the build output
            * simple plugin to call less.render
            * entire plugin is 24 lines (including whitespace!)
* Speed!
    * The goal: site has to load reasonably well in chrome with the 'Regular 2G' preset
        * homepage ~3.3s
        * image heavy blog post ~18s
        * regular text post ~4s
        * for reference: google.com took ~12s to load
    * CSS
        * Remove webfonts - move to a 'system ui' fontstack
    * As little JS as possible
        * jQuery on the homepage (because i want to use the terminal ... overkill but it's cool)
        * cloudflare.js - can't really be helped, cloudflare gives too many benefits (free ssl, dns, cname flattening, minifiy html/js/css)
        * ga.js - again, can't be helped if you want analytics
        * disqus - heavy, but doesnt really affect page load as it loads when the user scrolls down
    * Optimize images
        * ~400k -> ~40k
        * still link to originals

* Code readability
    * prefer html5 tags over css classes where possible
    * use layouts that extend, no includes
    * nothing in plain html or css
    * pug templates + markdown
    * less


* One repo for the whole site - no separate 'homepage'
    * As much code reuse as possible (css/layouts)
    * Easy to update
    * Feature blog posts on the homepage