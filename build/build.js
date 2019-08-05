const buildJS = require('./tasks/rollup').buildJS;
const buildSass = require('./tasks/scss').buildSass;
const copyFiles = require('./tasks/copy').copyFiles;

buildJS();
buildSass();
copyFiles();
