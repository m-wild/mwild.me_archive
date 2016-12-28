Build/Publish instructions:
```
1. git clone tehmantra.github.io
2. cd tehmantra.github.io build
3. cd build
4. git checkout master
5. cd ..
6. make changes in tehmantra.github.io...
7. git commit -am && git push
8. node index.js
9. cd build
10. git commit -am && git push
```

This sets up `tehmantra.github.io/` as tracking the 'devel' branch, and `tehmantra.github.io/build/` as tracking 'master'.

Todo:
* make a script to automate publishing