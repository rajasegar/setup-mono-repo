#!/usr/bin/env node
const argv = require('yargs').argv;
const fse = require('fs-extra');
const walkSync = require('walk-sync');

const [root] = argv._;

console.log('Setting up mono-repo');
console.log(root);

const manifests = walkSync.entries(root)
  .filter(e => e.relativePath.includes('package.json'));



console.log(manifests.length);
manifests.forEach(m => {
  const package = require(`packages/@glimmer/${m.relativePath}`);
  console.log(package.name);
});

