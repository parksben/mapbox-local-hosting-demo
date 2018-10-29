const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const MBTiles = require('@mapbox/mbtiles');
const q = require('d3-queue').queue();
const utils = require('./utils');

const app = express();
app.use(morgan('short'));

module.exports = {
  /**
   * Load a tileset and return a reference with metadata
   * @param {object} file reference to the tileset
   * @param {function} callback that returns the resulting tileset object
   */
  loadTiles: function(file, callback) {
    new MBTiles(file, function(err, tiles) {
      if (err) throw err;
      tiles.getInfo(function(err, info) {
        if (err) throw err;

        const tileset = Object.assign({}, info, {
          tiles: tiles,
        });

        callback(null, tileset);
      });
    });
  },

  /**
   * Defer loading of multiple MBTiles and spin up server.
   * Will merge all the configurations found in the sources.
   * @param {object} config for the server, e.g. port
   * @param {function} callback with the server configuration loaded
   */
  serve: function(config, callback) {
    const loadTiles = this.loadTiles;
    const listen = this.listen;

    config.mbtiles.forEach(function(file) {
      q.defer(loadTiles, file);
    });

    q.awaitAll(function(error, tilesets) {
      if (error) throw error;
      const finalConfig = utils.mergeConfigurations(config, tilesets);
      listen(finalConfig, callback);
    });
  },

  listen: function(config, onListen) {
    const format = config.tiles._info.format;

    // static server
    const oneMonth = 30 * 86400000; // ms
    if (fs.existsSync(path.join(__dirname, './build'))) {
      app.use('/', express.static('./build'));
    }
    app.use(
      '/assets/font',
      express.static('./assets/font', {
        maxage: oneMonth,
      })
    );
    app.use(
      '/assets/sprite',
      express.static('./assets/sprite', {
        maxage: oneMonth,
      })
    );

    // tile server
    app.get('/assets/:source/:z/:x/:y.' + format, function(req, res) {
      const { source, x, y, z } = req.params;

      const { tiles } = config.sources[source];
      tiles.getTile(z, x, y, function(err, tile, headers) {
        if (err) {
          res.end();
        } else {
          res.writeHead(200, headers);
          res.end(tile);
        }
      });
    });

    config.server = app.listen(config.port, function() {
      onListen(null, config);
    });
  },
};
