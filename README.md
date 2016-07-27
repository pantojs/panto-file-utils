# panto-file-utils
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url] [![Coverage Status][coveralls-image]][coveralls-url]

File utils for panto.

You can _locate_/_read_ file(s) ONLY in src directory, but _mkdir_/_write_/_remove_ ONLY in output directory.

```js
const PantoOptions = require('panto-options');
const FileUtils = require('panto-file-utils');

const fu = new FileUtils(new PantoOptions({cwd: '.', src: 'src', output: 'out'}));

fu.isBinary('foo/bar/a.png')// true
fu.isBinary('a.js')// false

// locate only in SRC
fu.locate('foo/a.js')// ./src/foo/a.js

// touch only in OUTPUT
fu.touch('foo/a.js')// ./out/foo/a.js

// read from only SRC
fu.read('foo/a.js').then(...)// ./src/foo/a.js

// write to only OUTPUT
fu.write('foo/b.js', 'hello').then(...) // ./out/foo/b.js

// remove from only OUTPUT,alias unlink/remove
fu.rimraf('foo/b.js', 'hello').then(...) // ./out/foo/b.js

// mkdir only in OUTPUT
fu.safeDirp('bar').then(...)// ./out/bar/

fu.copy('foo', 'bar').then(...)// ./out/bar/

// Alias for multimatch
fu.match(...)
```

## apis
 - isBinary(filename): Boolean, if it's a binary file type.
 - locate(filename): Promise, return a file path under ${cwd}/${src}.
 - touch(filename): Promise, return a file path under ${cwd}/${output}.
 - safeDirp(filename): Promise, make sure file's directories exist.
 - read(filename): Promise, read a file under ${cwd}/${src}.
 - write(filename, content): Promise, write a file under ${cwd}/${output}.
 - match(filename, pattern): Promise, alias as [multimatch](https://www.npmjs.com/package/multimatch).
 - remove(filename): Promise, remove a file or directory under ${cwd}/${output}.
 - unlink: Alias for remove.
 - rimraf: Alias for remove.
 - copy: Promise, copy from ${cwd}/${src} to ${cwd}/${output}.

[npm-url]: https://npmjs.org/package/panto-file-utils
[downloads-image]: http://img.shields.io/npm/dm/panto-file-utils.svg
[npm-image]: http://img.shields.io/npm/v/panto-file-utils.svg
[travis-url]: https://travis-ci.org/pantojs/panto-file-utils
[travis-image]: http://img.shields.io/travis/pantojs/panto-file-utils.svg
[david-dm-url]:https://david-dm.org/pantojs/panto-file-utils
[david-dm-image]:https://david-dm.org/pantojs/panto-file-utils.svg
[david-dm-dev-url]:https://david-dm.org/pantojs/panto-file-utils#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/pantojs/panto-file-utils/dev-status.svg
[coveralls-image]:https://coveralls.io/repos/github/pantojs/panto-file-utils/badge.svg?branch=master
[coveralls-url]:https://coveralls.io/github/pantojs/panto-file-utils?branch=master