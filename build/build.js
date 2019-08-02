const buildJS = require('./tasks/rollup').buildJS;
const buildSass = require('./tasks/scss').buildSass;

buildJS();
buildSass();
