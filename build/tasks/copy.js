const fs = require('fs-extra');
const colors = require('colors');

module.exports.copyIndex = () => {

  fs.copy('src/index.html', 'target/index.html')
    .then(() => console.log(`copy index.html success!`.bold))
    .catch(err => console.error(err));

}
