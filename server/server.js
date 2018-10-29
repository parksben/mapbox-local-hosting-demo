const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2), {
  boolean: ['n', 'quiet', 'q'],
});
const utils = require('./utils');
const MBView = require('./mbview');

const mbFileDir = path.resolve(__dirname, './assets/mbtiles');
const mbtiles = fs.readdirSync(mbFileDir).map(file => mbFileDir + '/' + file);

if (argv.version || argv.v) {
  console.log(utils.version());
  process.exit(0);
} else if (!mbtiles.length) {
  console.log(utils.usage());
  process.exit(1);
}

try {
  mbtiles.forEach(function(f) {
    fs.statSync(f).isFile();
  });
} catch (e) {
  return console.error(e);
}

const params = {
  center: argv.center || [-122.42, 37.75],
  mbtiles,
  port: argv.port || 3000,
  zoom: 12,
  quiet: argv.q || argv.quiet,
};

MBView.serve(params, function(err, config) {
  console.log('Server is listening on http://localhost:' + config.port);
});
