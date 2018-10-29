const fs = require('fs');

/**
 * Merge a configuration with tileset objects and
 * set 'smart' defaults based on these sources, e.g. center, zoom
 * @param {object} config passed to the mbview server
 * @param {array} tilesets of objects extracted from the mbtiles
 * @return {object} updated config object with sources appended
 */
module.exports.mergeConfigurations = function(config, tilesets) {
  const tilehash = tilesets.reduce(function(prev, curr) {
    const c = {};
    c[curr.basename] = curr;
    return Object.assign({}, prev, c);
  }, {});
  const smart = Object.assign({}, config, tilesets[0]);
  const centerZoom = smart.center.pop();
  smart.zoom = smart.zoom || centerZoom;
  smart.center.push(smart.zoom);
  return Object.assign({}, smart, {
    sources: tilehash,
  });
};

/**
 * Get usage instructions
 * @return {String} the instructions to run this thing
 */
module.exports.usage = function() {
  return 'Please ensure that if there are some .mbtiles files under directory `server/assets/mbtiles/`\n';
};

/**
 * Get module version from the package.json file
 * @return {String} version number
 */
module.exports.version = function() {
  const data = fs.readFileSync(__dirname + '/package.json');
  return JSON.parse(data).version;
};
