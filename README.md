# panto-file-utils
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

File utils for panto.

```js
const PantoOptions = require('panto-options');
const FileUtils = require('panto-file-utils');

const fu = new FileUtils(new PantoOptions({cwd:'.', output:'out'}));

fu.read('a.js').then(...)
```

## apis
 - isBinary(filename): Boolean, if it's a binary file type.
 - locate(filename): Promise, return a file path under cwd.
 - safeDirp(filename): Promise, make sure file's directories exist
 - read(filename): Promise, read a file under cwd
 - write(filename, content): Promise, write a file under cwd/output
 - match(filename, pattern): Promise, alias as minimatch
 - rimraf(filename, options): Promise, remove a file or directory under output

[npm-url]: https://npmjs.org/package/panto-file-utils
[downloads-image]: http://img.shields.io/npm/dm/panto-file-utils.svg
[npm-image]: http://img.shields.io/npm/v/panto-file-utils.svg
[travis-url]: https://travis-ci.org/pantojs/panto-file-utils
[travis-image]: http://img.shields.io/travis/pantojs/panto-file-utils.svg
[david-dm-url]:https://david-dm.org/pantojs/panto-file-utils
[david-dm-image]:https://david-dm.org/pantojs/panto-file-utils.svg
[david-dm-dev-url]:https://david-dm.org/pantojs/panto-file-utils#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/pantojs/panto-file-utils/dev-status.svg