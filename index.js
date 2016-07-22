/**
 * Copyright (C) 2016 pantojs.xyz
 * index.js
 *
 * changelog
 * 2016-07-05[13:39:10]:revised
 * 2016-07-22[18:21:45]:add #touch #remove #unlink #copy
 *
 * @author yanni4night@gmail.com
 * @version 0.2.1
 * @since 0.1.0
 */
'use strict';

//const fs = require('fs');
const fs = require('fs-extra');
const path = require('path');
const mkdirp = require('mkdirp');
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
    /**
     * Find a filename under ${src}.
     * 
     * @param  {string} name
     * @return {string}
     */
    locate(name) {
        return path.join(this._options.get('cwd', process.cwd()), this._options.get('src'), name);
    }
    /**
     * Return a filename relative to ${cwd}/${output}.
     * 
     * @param  {string} name
     * @return {string}
     */
    touch(name) {
        return path.join(this._options.get('cwd', process.cwd()), this._options.get('output'), name);
    }
    /**
     * Create a directory under ${cwd}/${output}.
     * 
     * @param  {string} name
     * @return {Promise}
     */
    safeDirp(name) {
        const fpath = path.join(this._options.get('cwd', process.cwd()), this._options.get('output'), name);
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
    /**
     * Read a file under ${cwd}/${src}.
     * 
     * @param  {string} name
     * @return {Promise}
     */
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
    /**
     * Write a file to ${cwd}/${output}.
     * 
     * @param  {string} name
     * @param  {string|Buffer} content
     * @return {Promise}
     */
    write(name, content) {
        return this.safeDirp(name).then(fpath => {
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
    /**
     * Alias for minimatch.
     * 
     * @param  {...string} args
     * @return {Boolean}
     */
    match(...args) {
        return minimatch(...args);
    }
    /**
     * Remove a file under ${cwd}/${output}.
     * 
     * @param  {string} filepath
     * @return {Promise}
     */
    remove(filepath) {
        return new Promise((resolve, reject) => {
            fs.remove(this.touch(filepath), err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    /**
     * Alias for remove
     */
    rimraf(...args) {
        return this.remove(...args);
    }
    /**
     * Alias for remove
     */
    unlink(...args) {
        return this.remove(...args);
    }
    /**
     * Copy from ${cwd}/${src} to ${cwd}/${output}.
     * 
     * @param  {string} src
     * @param  {string} dest
     * @param  {object} opts
     * @return {Promise}
     */
    copy(src, dest, opts) {
        return new Promise((resolve, reject) => {
            fs.copy(this.locate(src), this.touch(dest), opts || {}, err => {
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