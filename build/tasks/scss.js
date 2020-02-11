const sass = require('node-sass');
const fs = require('fs-extra');
const colors = require('colors');
const mkdirp = require('mkdirp');

module.exports.buildSass = () => {

  mkdirp('target/css', error => {

    if(error) {
      throw error;
    }

    sass.render({
      file: 'src/scss/main.src.scss',
      outputStyle: 'compressed'
    }, (err, result) => {
      if(err) {
        throw err
      } else {
        fs.writeFile('target/css/style.css', result.css);
        console.log(`target/css/style.css modified`.bold);
      }
    });
  })

}
