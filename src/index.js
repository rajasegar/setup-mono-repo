const fse = require('fs-extra');
const walkSync = require('walk-sync');
const path = require('path');
const { stripIndent } = require('common-tags');

function createReadme(root) {

    console.log('Setting up mono-repo');
    console.log(root);

    const manifests = walkSync.entries(root)
    .filter(e => e.relativePath.includes('package.json'));

    console.log(manifests.length);

    manifests.forEach(m => {

        const packagePath = `packages/@glimmer/${m.relativePath}`;
        fse.readJson(packagePath)
      .then(packageObj => {
	  console.log(packageObj.name); 
	  const md = stripIndent`
	  # ${packageObj.name}
	  This is the package description.

	  ## Installation
	  \`\`\`
	  npm install ${packageObj.name}
	  \`\`\`
	`;

	  const readmePath = `packages/@glimmer/${path.dirname(m.relativePath)}/README.md`;

	  fse.outputFile(readmePath, md)
	  .then(() => fse.readFile(readmePath, 'utf8'))
	  .then(data => {
	      console.log(data);
	  })
	  .catch(err => {
	      console.error(err);
	  });
      })
      .catch(err => {
	  console.error(err);
      });

    });
}

module.exports = {
    createReadme
};
