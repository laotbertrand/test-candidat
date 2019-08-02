const buildJS = require('./tasks/rollup').buildJS;
const buildSass = require('./tasks/scss').buildSass;
const chokidar = require('chokidar');
const colors = require('colors');

const watcher = chokidar.watch('src', {
  persistent: true
});

const build = path => {
  if(path.indexOf('src.js') > -1) {
    buildJS();
    console.log(`> File ${path} changed`.cyan);
  } else if (path.indexOf('src.scss') > -1) {
    buildSass();
  }
}

watcher.on('change', build);
watcher.on('add', build);

console.log('Watcher started'.green);
