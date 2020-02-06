const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const browsersync = require('rollup-plugin-browsersync');
const copy = require('rollup-plugin-copy');
const colors = require('colors');

const inputOptions = {
  input: 'src/javascript/main.src.js',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    browsersync({
      server: 'target'
    }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'target' }
      ]
    })
  ]
};

const outputOptions = {
  file: 'target/js/bundle.js',
  format: 'cjs'
};

async function buildJS() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
  console.log(`target/js/bundle.js`.bold);
}

module.exports.buildJS = buildJS;
