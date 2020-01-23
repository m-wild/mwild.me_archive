---
layout: post.pug
title: Replacing Disqus with utterances
category: tech
excerpt: Replacing one empty comments system with another :^)
---

[utterances](https://utteranc.es/) is a very cool commenting system based on GitHub issues.
I ran into this project about 6 months ago, and after seeing [how well issues work for doc.microsoft.com](https://docs.microsoft.com/en-us/teamblog/a-new-feedback-system-is-coming-to-docs), I decided to migrate my site to use the same system.


This was fairly trivial, despite [Metalsmith](http://www.metalsmith.io/) not having any utterances plugin.

Simply ripping out all the code related to metalsmith-disqus from `index.js` and `package.json`. Then replacing the code that rendered disqus with the `utteranc.es/client.js` script.
```diff
diff --git a/layouts/post.pug b/layouts/post.pug
--- a/layouts/post.pug
+++ b/layouts/post.pug
@@ -8,5 +8,6 @@ block content

     != contents

-  section
-    div#disqus_thread
+  if comments
+    script(src="https://utteranc.es/client.js" repo=utterances.repo issue-term=utterances.issueterm async)
```

This seemed like a simple enough setup not to need its own plugin, it can just be enabled/disabled using the existing `comments` flag from the post frontmatter.

Then add a new field to the metadata so the layout renderer can replace `utterances.repo` and `utterances.issueterm` variables

```diff
diff --git a/index.js b/index.js
--- a/index.js
+++ b/index.js
@@ -19,7 +18,12 @@ Metalsmith(__dirname)
   .metadata({
     site: {
       title: 'mwild'
-  }})
+    },
+    utterances: {
+      repo: 'tehmantra/tehmantra.github.io',
+      issueterm: 'title'
+    }
+  })
```

~~Check out the comments below 👇👇👇~~