/**
 * Copyright (C) 2016 pantojs.xyz
 * index.js
 *
 * changelog
 * 2016-07-05[13:39:10]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const minimatch = require('minimatch');
const binaryExtensions = require('binary-extensions');
const defineFrozenProperty = require('define-frozen-property');

class FileUtils {
    constructor(opt) {
        defineFrozenProperty(this, '_options', opt);
    }
    isBinary(filepath) {
        const ext = path.extname(filepath).slice(1).toLowerCase();
        return this._options.get('binary_resource', '').toLowerCase().split(',').indexOf(ext) > -1 ||
            binaryExtensions.indexOf(ext) > -1;
    }
    locate(name) {
        return path.join(this._options.get('cwd', process.cwd()), name);
    }
    safeDirp(name) {
        const fpath = this.locate(name);
        const dir = path.dirname(fpath);
        return new Promise(resolve => {
            fs.exists(dir, exist => {
                resolve(exist);
            });
        }).then(exist => {
            if (!exist) {
                return new Promise((resolve, reject) => {
                    mkdirp(dir, err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(fpath);
                        }
                    });
                });
            } else {
                return fpath;
            }
        });
    }
    read(name) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.locate(name), {
                encoding: this.isBinary(name) ? null : 'utf-8'
            }, (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(content);
                }
            });
        });
    }
    write(name, content) {
        return this.safeDirp(path.join(this._options.get('output', 'output'), name)).then(fpath => {
            return new Promise((resolve, reject) => {
                fs.writeFile(fpath, content, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        });
    }
    match(...args) {
        return minimatch(...args);
    }
    rimraf(filepath, opts = {}) {
        return new Promise((resolve, reject) => {
            rimraf(path.join(this.locate(this._options.get('output', 'output')), filepath), opts, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = FileUtils;