#!/usr/bin/env node
'use strict';

const argv = require('yargs').argv;

const [root] = argv._;

const { createReadme } = require('../src');
createReadme(root);

