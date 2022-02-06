const minify = require('minify');
const fs = require('fs');
const path = require('path');

const target = process.argv[2];

const targetPath = path.resolve(target);

console.log('Replacing "use strict" directive to support CloudFront Functions execution environment');
const fileContents = fs.readFileSync(targetPath, {encoding: 'utf8'});
fs.writeFileSync(targetPath, fileContents.replace('"use strict"', 'var exports = {};'));

console.log(`Performing minification and stringification on ${targetPath}`);
minify(targetPath, { js: { ecma: 5 } })
    .then((minified) => {
        fs.writeFileSync(path.resolve(target.replace('.js', '.min.js')), JSON.stringify(minified)); // Write a stringified version
        console.log('Done!');
    })
    .catch(console.error);
