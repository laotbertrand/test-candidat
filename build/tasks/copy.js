const fs = require('fs-extra');
const colors = require('colors');
const mkdirp = require('mkdirp');

module.exports.copyIndex = () => {

  fs.copy('src/index.html', 'target/index.html')
    .then(() => console.log(`copy index.html success!`.bold))
    .catch(err => console.error(err));

  mkdirp('target/images', error => {

    if(error) {
      throw error;
    }

    fs.copy('assets/images/', 'target/images/')
      .then(() => console.log(`copy images success!`.bold))
      .catch(err => console.error(err));
  });

}
