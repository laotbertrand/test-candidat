const buildJS = require('./tasks/rollup').buildJS;
const buildSass = require('./tasks/scss').buildSass;
const copyIndex = require('./tasks/copy').copyIndex;

buildJS();
buildSass();
copyIndex();
