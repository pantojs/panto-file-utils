/**
 * Copyright (C) 2016 pantojs.xyz
 * test.js
 *
 * changelog
 * 2016-07-05[13:41:49]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.3.0
 * @since 0.1.0
 */
'use strict';
const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const PantoOptions = require('panto-options');
const FileUtils = require('../');

const fu = new FileUtils(new PantoOptions({
    cwd: __dirname,
    src: 'fixtures',
    output: 'output'
}));

rimraf.sync(__dirname + '/output', {
    force: true
});

describe('FileUtils', function () {
    describe('#isBinary', function () {
        it('should return true if .gif/.png/.jpg', function () {
            assert.ok(fu.isBinary('/x/a.gif'));
            assert.ok(fu.isBinary('/x/a.png'));
            assert.ok(fu.isBinary('/x/a.jpg'));
        });
        it('should return false if .html/.js/.css', function () {
            assert.ok(!fu.isBinary('/x/a.html'));
            assert.ok(!fu.isBinary('/x/a.js'));
            assert.ok(!fu.isBinary('/x/a.css'));
        });
    });
    describe('#locate', function () {
        it('should get file under "cwd/src"', function () {
            assert.deepEqual(fu.locate('a.js'), __dirname + '/fixtures/a.js');
        });
    });
    describe('#touch', function () {
        it('should get file under "cwd/output"', function () {
            assert.deepEqual(fu.touch('a.js'), __dirname + '/output/a.js');
        });
    });
    describe('#safeDirp', function () {
        it('should mkdir "output"', function (done) {
            fu.safeDirp('output/a.js').then(() => {
                assert.ok(fs.existsSync(__dirname + '/output/output'));
                assert.ok(fs.statSync(__dirname + '/output/output').isDirectory());
            }).then(() => {
                done();
            });
        });
    });
    describe('#read', function () {
        it('should read file', function (done) {
            fu.read('a.js').then(content => {
                assert.deepEqual(content, "'use strict';");
            }).then(() => {
                done();
            });
        });
    });
    describe('#write', function () {
        it('should write file', function (done) {
            fu.write('a.js', '##').then(() => {
                assert.ok(fs.existsSync(__dirname + '/output/a.js'));
            }).then(() => {
                return fu.read('../output/a.js')
            }).then(content => {
                assert.deepEqual(content, '##');
            }).then(() => {
                done()
            });
        });
    });
    describe('#match', function () {
        it('should match', function () {
            assert.ok(fu.match('a.js', '*.js'));
        });
        it('should multimatch', function () {
            assert.ok(fu.match('a.js', ['*.js']));
        });
    });
    describe('#rimraf#remove#unlink', function () {
        it('should remove file', function (done) {
            fu.rimraf('a.js').then(() => {
                assert.ok(!fs.existsSync(__dirname + '/output/a.js'));
            }).then(() => {
                done();
            });
        });
        it('should remove directory', function (done) {
            fu.rimraf('.').then(() => {
                assert.ok(!fs.existsSync(__dirname + '/output'));
            }).then(() => {
                done();
            });
        });
    });
    describe('#copy', () => {
        it('should copy', done => {
            fu.copy('a.js', 'b.js').then(() => {
                assert.ok(fs.existsSync(__dirname + '/output/b.js'));
            }).then(() => done());
        });
    });
});