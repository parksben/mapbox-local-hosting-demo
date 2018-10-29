export default {
  version: 8,
  sprite: `http://${window.location.host}/assets/sprite/sprite`,
  glyphs: `http://${window.location.host}/assets/font/{fontstack}/{range}.pbf`,
  sources: {
    openmaptiles: {
      type: 'vector',
      tiles: [
        `http://${window.location.host}/assets/${
          process.env.MBTILES_FILE_NAME
        }/{z}/{x}/{y}.pbf`,
      ],
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': {
          base: 1,
          stops: [[6, 'hsl(215, 17%, 35%)'], [8, 'hsl(215, 17%, 31%)']],
        },
      },
    },
    {
      id: 'water',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'water',
      filter: ['==', '$type', 'Polygon'],
      layout: {},
      paint: {
        'fill-color': '#627a84',
      },
    },
    {
      id: 'water-contour',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'water',
      filter: ['==', '$type', 'Polygon'],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#4c5f67',
        'line-width': 1,
        'line-opacity': 1.0,
      },
    },
    {
      id: 'waterway-river',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'waterway',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'river']],
      layout: {
        'line-cap': {
          base: 1,
          stops: [[0, 'butt'], [11, 'round']],
        },
        'line-join': 'round',
      },
      paint: {
        'line-color': 'hsl(197, 15%, 45%)',
        'line-opacity': {
          base: 1,
          stops: [[8, 0], [8.5, 1]],
        },
        'line-width': {
          base: 1,
          stops: [[8.5, 0.1], [20, 8]],
        },
      },
    },
    {
      id: 'waterway-stream',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'waterway',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'stream']],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': 'hsl(197, 15%, 45%)',
        'line-opacity': {
          base: 1,
          stops: [[13, 0], [13.5, 1]],
        },
        'line-width': {
          base: 1,
          stops: [[13.5, 0.1], [20, 3]],
        },
      },
    },
    {
      id: 'water_name',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'water_name',
      filter: ['==', '$type', 'Point'],
      minzoom: 14,
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [[16, 11], [20, 13]],
        },
        'symbol-spacing': 250,
        'text-font': ['Noto Sans Bold'],
        'text-rotation-alignment': 'viewport',
        'text-field': {
          base: 1,
          stops: [[0, ''], [13, '{name:nonlatin}']],
        },
        'text-letter-spacing': 0.01,
        'text-max-width': 7,
      },
      paint: {
        'text-color': 'hsl(229, 53%, 72%)',
        'text-halo-color': 'hsla(200, 24%, 10%, 0.8)',
        'text-halo-width': 0.5,
        'text-opacity': {
          base: 1,
          stops: [[13.99, 0], [14, 1]],
        },
        'text-halo-blur': 0.5,
      },
    },
    {
      id: 'aeroway-aerodrome',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'aeroway',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'aerodrome']],
      layout: {},
      paint: {
        'fill-opacity': 1,
        'fill-color': '#4c575d',
      },
    },
    {
      id: 'aeroway-apron',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'aeroway',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'apron']],
      layout: {},
      paint: {
        'fill-opacity': 1,
        'fill-color': '#555862',
      },
    },
    {
      id: 'aeroway-taxiway',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'aeroway',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'taxiway'],
      ],
      layout: {
        'line-join': 'miter',
        'line-cap': 'butt',
        'line-miter-limit': 2,
      },
      paint: {
        'line-color': '#000000',
        'line-width': {
          base: 1.5,
          stops: [[10, 0.5], [18, 20]],
        },
        'line-opacity': 1,
      },
    },
    {
      id: 'aeroway-runway',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'aeroway',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'runway']],
      layout: {
        'line-join': 'miter',
        'line-cap': 'butt',
        'line-miter-limit': 2,
      },
      paint: {
        'line-color': '#000000',
        'line-width': {
          base: 1.5,
          stops: [[9, 1], [18, 80]],
        },
        'line-opacity': 1,
      },
    },
    {
      id: 'landcover-wood',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'wood']],
      layout: {},
      paint: {
        'fill-opacity': {
          base: 1.5,
          stops: [[2, 0.3], [7, 0]],
        },
        'fill-color': '#40635d',
        'fill-antialias': true,
      },
    },
    {
      id: 'landcover-grass',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'grass']],
      layout: {},
      paint: {
        'fill-opacity': {
          base: 1,
          stops: [[5, 0], [6, 1]],
        },
        'fill-color': '#40635d',
        'fill-antialias': true,
      },
    },
    {
      id: 'landcover-farmland',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'farmland']],
      layout: {},
      paint: {
        'fill-opacity': {
          base: 1.5,
          stops: [[2, 0.3], [7, 0]],
        },
        'fill-color': '#40635d',
        'fill-antialias': true,
      },
    },
    {
      id: 'landcover-wetland',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'wetland']],
      layout: {},
      paint: {
        'fill-opacity': {
          base: 1,
          stops: [[5, 0], [6, 0.5]],
        },
        'fill-color': '#40635d',
        'fill-antialias': true,
      },
    },
    {
      id: 'landuse-industrial',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landuse',
      filter: [
        'all',
        ['==', '$type', 'Polygon'],
        ['==', 'class', 'industrial'],
      ],
      layout: {},
      paint: {
        'fill-opacity': 1,
        'fill-color': '#555862',
      },
    },
    {
      id: 'landuse-residential',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landuse',
      filter: [
        'all',
        ['==', '$type', 'Polygon'],
        ['==', 'class', 'residential'],
      ],
      layout: {},
      paint: {
        'fill-opacity': 1,
        'fill-color': '#555862',
      },
    },
    {
      id: 'landuse-military',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landuse',
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'class', 'military']],
      layout: {},
      paint: {
        'fill-opacity': 1,
        'fill-color': '#555862',
      },
    },
    {
      id: 'park-nature_reserve',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'park',
      filter: [
        'all',
        ['==', '$type', 'Polygon'],
        ['==', 'class', 'nature_reserve'],
      ],
      layout: {},
      paint: {
        'fill-opacity': {
          base: 1,
          stops: [[5, 0], [6, 1]],
        },
        'fill-color': '#40635d',
      },
    },
    {
      id: 'park-national_park',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'park',
      filter: [
        'all',
        ['==', '$type', 'Polygon'],
        ['==', 'class', 'national_park'],
      ],
      layout: {},
      paint: {
        'fill-opacity': {
          base: 1,
          stops: [[5, 0], [6, 0.5]],
        },
        'fill-color': '#40635d',
      },
    },
    {
      id: 'transportation-service-case',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'any',
          ['==', 'class', 'service'],
          ['==', 'class', 'path'],
          ['==', 'class', 'track'],
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.2,
          stops: [[10, 0.5], [18, 1]],
        },
        'line-color': {
          base: 1,
          stops: [[13, 'hsl(215, 11%, 28%)'], [14, 'hsl(215, 11%, 23%)']],
        },
        'line-gap-width': {
          base: 1.5,
          stops: [[12.5, 0.5], [14, 1], [19, 6]],
        },
      },
    },
    {
      id: 'transportation-service',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'any',
          ['==', 'class', 'service'],
          ['==', 'class', 'path'],
          ['==', 'class', 'track'],
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12.5, 0.5], [14, 1], [19, 6]],
        },
        'line-color': {
          base: 1,
          stops: [[13, 'hsl(215, 11%, 28%)'], [14, 'hsl(215, 11%, 23%)']],
        },
      },
    },
    {
      id: 'transportation-minor-case',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'minor']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.2,
          stops: [[10, 0.5], [18, 1]],
        },
        'line-color': 'hsl(215, 11%, 19%)',
        'line-opacity': {
          base: 1,
          stops: [[13.99, 0], [14, 1]],
        },
        'line-gap-width': {
          base: 1.5,
          stops: [[13, 0], [14, 2], [18, 18]],
        },
      },
    },
    {
      id: 'transportation-minor',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'minor']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[12.5, 0.5], [14, 2], [18, 18]],
        },
        'line-color': {
          base: 1,
          stops: [[13, 'hsl(215, 11%, 28%)'], [14, 'hsl(215, 11%, 23%)']],
        },
        'line-opacity': {
          base: 1,
          stops: [[11, 0], [11.25, 1]],
        },
      },
    },
    {
      id: 'transportation-rail',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'rail']],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-color': 'hsl(215, 12%, 25%)',
        'line-width': {
          base: 1.5,
          stops: [[14, 0.5], [20, 1]],
        },
        'line-offset': 0,
      },
    },
    {
      id: 'transportation-bridge-case',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'bridge']],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.2,
          stops: [[10, 0.5], [16, 1]],
        },
        'line-color': 'hsl(215, 11%, 19%)',
        'line-gap-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
      },
    },
    {
      id: 'transportation-bridge',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'bridge']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
        'line-color': {
          base: 0.7,
          stops: [[7, 'hsl(215, 36%, 59%)'], [11, 'hsl(215, 20%, 42%)']],
        },
      },
    },
    {
      id: 'transportation-bridge-arrows',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['all', ['==', '$type', 'LineString'], ['==', 'class', 'bridge']],
      minzoom: 14,
      layout: {
        'symbol-placement': 'line',
        'icon-image': {
          base: 1,
          stops: [[16, 'oneway-small'], [17, 'oneway-large']],
        },
        'symbol-spacing': 250,
        'icon-padding': 2,
      },
      paint: {},
    },
    {
      id: 'transportation-tertiary-case',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'tertiary'],
      ],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-width': {
          base: 1.2,
          stops: [[10, 0.5], [18, 1]],
        },
        'line-color': 'hsl(215, 11%, 19%)',
        'line-gap-width': {
          base: 1.5,
          stops: [[8.5, 0.5], [10, 0.75], [18, 32]],
        },
        'line-translate': [0, 0],
      },
    },
    {
      id: 'transportation-tertiary',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'tertiary'],
      ],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[8.5, 0.5], [10, 0.75], [18, 32]],
        },
        'line-color': {
          base: 1,
          stops: [[13, 'hsl(215, 11%, 23%)'], [14, 'hsl(215, 9%, 20%)']],
        },
        'line-opacity': {
          base: 1.2,
          stops: [[5, 0], [5.5, 1]],
        },
      },
    },
    {
      id: 'transportation-primary-case',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'primary'],
      ],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-width': {
          base: 1.2,
          stops: [[10, 0.5], [18, 1]],
        },
        'line-color': 'hsl(215, 11%, 19%)',
        'line-gap-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
        'line-translate': [0, 0],
      },
    },
    {
      id: 'transportation-primary',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'primary'],
      ],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
        'line-color': {
          base: 1,
          stops: [
            [7, 'hsl(215, 7%, 25%)'],
            [13, 'hsl(215, 8%, 22%)'],
            [14, 'hsl(215, 9%, 18%)'],
          ],
        },
        'line-opacity': 1,
      },
    },
    {
      id: 'transportation-primary-arrows',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'primary'],
      ],
      minzoom: 14,
      layout: {
        'symbol-placement': 'line',
        'icon-image': {
          base: 1,
          stops: [[16, 'oneway-small'], [17, 'oneway-large']],
        },
        'icon-rotation-alignment': 'map',
        'icon-padding': 2,
        'symbol-spacing': 250,
      },
    },
    {
      id: 'transportation-secondary-case',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'secondary'],
      ],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-width': {
          base: 1.2,
          stops: [[10, 0.5], [18, 1]],
        },
        'line-color': 'hsl(215, 11%, 19%)',
        'line-gap-width': {
          base: 1.5,
          stops: [[8.5, 0.5], [10, 0.75], [18, 32]],
        },
        'line-translate': [0, 0],
      },
    },
    {
      id: 'transportation-secondary',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'secondary'],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 1.5,
          stops: [[8.5, 0.5], [10, 0.75], [18, 32]],
        },
        'line-color': {
          base: 1,
          stops: [[13, 'hsl(215, 11%, 23%)'], [14, 'hsl(215, 9%, 20%)']],
        },
        'line-opacity': {
          base: 1.2,
          stops: [[5, 0], [5.5, 1]],
        },
      },
    },
    {
      id: 'transportation-secondary-arrows',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'secondary'],
      ],
      minzoom: 14,
      layout: {
        'symbol-placement': 'line',
        'icon-image': {
          base: 1,
          stops: [[16, 'oneway-small'], [17, 'oneway-large']],
        },
        'icon-rotation-alignment': 'map',
        'icon-padding': 2,
        'symbol-spacing': 250,
      },
    },
    {
      id: 'transportation-motorway-case',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'motorway'],
      ],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        'line-round-limit': 1.05,
      },
      paint: {
        'line-color': 'hsl(215, 11%, 19%)',
        'line-width': {
          base: 1.2,
          stops: [[10, 0.5], [16, 1]],
        },
        'line-opacity': 1,
        'line-gap-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
      },
    },
    {
      id: 'transportation-motorway',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'motorway'],
      ],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        'line-round-limit': 1.05,
      },
      paint: {
        'line-color': {
          base: 0.7,
          stops: [[7, 'hsl(215, 36%, 59%)'], [11, 'hsl(215, 20%, 42%)']],
        },
        'line-width': {
          base: 1.5,
          stops: [[5, 0.75], [18, 32]],
        },
        'line-opacity': 1,
      },
    },
    {
      id: 'transportation-motorway-arrows',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['==', 'class', 'motorway'],
      ],
      minzoom: 14,
      layout: {
        'icon-image': {
          base: 1,
          stops: [[16, 'oneway-large'], [17, 'oneway-small']],
        },
        'symbol-placement': 'line',
        'symbol-spacing': 250,
      },
    },
    {
      id: 'road-label-large',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'transportation_name',
      filter: ['==', '$type', 'LineString'],
      layout: {
        'text-size': {
          base: 1,
          stops: [[9, 10], [20, 20]],
        },
        'text-max-angle': 30,
        'symbol-spacing': {
          base: 1,
          stops: [[17, 250], [20, 480]],
        },
        'text-font': ['Noto Sans Bold'],
        'symbol-placement': 'line',
        'text-padding': 1,
        'text-rotation-alignment': 'map',
        'text-pitch-alignment': 'viewport',
        'text-field': '{name:nonlatin}',
        'text-letter-spacing': 0.01,
      },
      paint: {
        'text-color': 'hsl(215, 10%, 80%)',
        'text-halo-color': 'hsla(200, 24%, 10%, 0.8)',
        'text-halo-width': 1,
        'text-halo-blur': 1,
      },
    },
    {
      id: 'road-shields-black',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'transportation_name',
      filter: ['==', '$type', 'LineString'],
      layout: {
        'text-size': {
          base: 1,
          stops: [[6, 10.25], [11, 13.5]],
        },
        'icon-image': {
          property: 'ref_length',
          stops: [
            [1, 'default-1'],
            [2, 'default-2'],
            [3, 'default-3'],
            [4, 'default-4'],
            [5, 'default-5'],
            [6, 'default-6'],
          ],
        },
        'icon-rotation-alignment': 'viewport',
        'text-max-angle': 38,
        'symbol-spacing': {
          base: 1,
          stops: [[11, 150], [14, 500]],
        },
        'text-font': ['Noto Sans Regular'],
        'symbol-placement': {
          base: 1,
          stops: [[10, 'point'], [11, 'line']],
        },
        'text-padding': 2,
        'text-rotation-alignment': 'viewport',
        'icon-size': {
          base: 1,
          stops: [[6, 0.75], [11, 1]],
        },
        'text-field': '{ref}',
        'text-letter-spacing': 0.05,
        'icon-padding': 2,
      },
      paint: {
        'text-color': 'hsl(0, 0%, 7%)',
        'icon-halo-color': 'rgba(0, 0, 0, 1)',
        'icon-halo-width': 1,
        'text-opacity': 1,
        'icon-color': 'white',
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 0,
      },
    },
    {
      id: 'mountain_peak',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'mountain_peak',
      filter: ['==', '$type', 'Point'],
      layout: {
        'icon-image': {
          stops: [[13, 'mountain-11'], [14, 'mountain-15']],
        },
        'icon-size': 1,
        'icon-padding': 2,
        'text-field': '{name:nonlatin}',
        'text-font': ['Noto Sans Bold'],
        'text-size': {
          base: 1,
          stops: [[16, 11], [20, 13]],
        },
        'text-letter-spacing': 0.01,
        'text-line-height': 1.1,
        'text-max-width': 8,
        'text-anchor': 'top',
        'text-offset': [0, 0.65],
        'text-padding': 2,
      },
      paint: {
        'text-color': 'hsl(106, 22%, 55%)',
        'text-halo-color': 'hsla(200, 24%, 10%, 0.8)',
        'text-halo-width': 1,
      },
    },
    {
      id: 'building-polygons',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'building',
      filter: ['==', '$type', 'Polygon'],
      minzoom: 14,
      paint: {
        'fill-color': 'hsl(215, 15%, 30%)',
        'fill-opacity': {
          base: 1,
          stops: [[15.5, 0], [16, 1]],
        },
      },
    },
    {
      id: 'place-city',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'place',
      filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'city']],
      minzoom: 1,
      maxzoom: 14,
      layout: {
        'icon-image': 'dot-11',
        'text-font': ['Noto Sans Bold'],
        'text-offset': {
          base: 1,
          stops: [[7.99, [0, -0.25]], [8, [0, 0]]],
        },
        'text-anchor': {
          base: 1,
          stops: [[7, 'bottom'], [8, 'center']],
        },
        'text-field': '{name:nonlatin}',
        'text-max-width': 7,
        'text-size': {
          base: 0.9,
          stops: [[4, 12], [10, 22]],
        },
      },
      paint: {
        'text-halo-blur': 1,
        'text-opacity': 1,
        'text-halo-color': 'hsla(200, 24%, 10%, 0.8)',
        'text-halo-width': 1,
        'icon-opacity': {
          base: 1,
          stops: [[7.99, 1], [8, 0]],
        },
        'text-color': {
          base: 1,
          stops: [[8, 'hsl(215, 10%, 80%)'], [10, 'hsl(215, 10%, 70%)']],
        },
      },
    },
    {
      id: 'place-island',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'place',
      filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'island']],
      maxzoom: 13,
      layout: {
        'text-line-height': 1.2,
        'text-size': {
          base: 1,
          stops: [[10, 11], [18, 16]],
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': ['Noto Sans Bold'],
        'text-padding': 2,
        'text-offset': [0, 0],
        'text-rotation-alignment': 'viewport',
        'text-field': '{name:nonlatin}',
        'text-letter-spacing': 0.01,
        'text-max-width': 7,
      },
      paint: {
        'text-color': 'hsl(230, 29%, 70%)',
        'text-halo-color': 'hsla(200, 24%, 10%, 0.8)',
        'text-halo-width': 1,
      },
    },
    {
      id: 'place-town',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'place',
      filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'town']],
      minzoom: 6,
      maxzoom: 13,
      layout: {
        'icon-image': 'dot-9',
        'text-font': ['Noto Sans Bold'],
        'text-offset': {
          base: 1,
          stops: [[7, [0, -0.15]], [8, [0, 0]]],
        },
        'text-anchor': {
          base: 1,
          stops: [[7, 'bottom'], [8, 'center']],
        },
        'text-field': '{name:nonlatin}',
        'text-max-width': 7,
        'text-size': {
          base: 1,
          stops: [[7, 11.5], [15, 20]],
        },
      },
      paint: {
        'text-color': {
          base: 1,
          stops: [[8, 'hsl(215, 10%, 80%)'], [10, 'hsl(215, 10%, 70%)']],
        },
        'text-halo-color': 'hsla(200, 24%, 10%, 0.8)',
        'text-halo-width': 1.25,
        'icon-opacity': {
          base: 1,
          stops: [[7.99, 1], [8, 0]],
        },
      },
    },
    {
      id: 'place-village',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'place',
      filter: ['all', ['==', '$type', 'Point'], ['==', 'class', 'village']],
      minzoom: 8,
      maxzoom: 13,
      layout: {
        'text-field': '{name:nonlatin}',
        'text-font': ['Noto Sans Bold'],
        'text-max-width': 7,
        'text-size': {
          base: 1,
          stops: [[10, 11.5], [16, 18]],
        },
      },
      paint: {
        'text-halo-color': 'hsla(200, 24%, 10%, 0.8)',
        'text-halo-width': 1.25,
        'text-color': 'hsl(215, 10%, 80%)',
      },
    },
    {
      id: 'poi-labels',
      type: 'symbol',
      source: 'openmaptiles',
      'source-layer': 'poi',
      filter: ['==', '$type', 'Point'],
      layout: {
        'text-line-height': 1.1,
        'text-size': {
          base: 1,
          stops: [[16, 11], [20, 13]],
        },
        'icon-image': {
          stops: [[13, '{class}-11'], [14, '{class}-15']],
        },
        'text-max-angle': 38,
        'symbol-spacing': 250,
        'text-font': ['Noto Sans Bold'],
        'text-padding': 2,
        'text-offset': [0, 0.65],
        'text-rotation-alignment': 'viewport',
        'text-anchor': 'top',
        'text-field': '{name:nonlatin}',
        'text-letter-spacing': 0.01,
        'text-max-width': 8,
      },
      paint: {
        'text-color': {
          base: 1,
          type: 'categorical',
          property: 'class',
          stops: [
            ['bus', 'hsl(229, 53%, 72%)'],
            ['campsite', 'hsl(106, 22%, 55%)'],
            ['cemetery', 'hsl(106, 22%, 55%)'],
            ['college', 'hsl(38, 25%, 57%)'],
            ['dentist', 'hsl(330, 25%, 62%)'],
            ['doctor', 'hsl(330, 25%, 62%)'],
            ['dog-park', 'hsl(106, 22%, 55%)'],
            ['ferry', 'hsl(229, 53%, 72%)'],
            ['garden', 'hsl(106, 22%, 55%)'],
            ['golf', 'hsl(106, 22%, 55%)'],
            ['hospital', 'hsl(330, 25%, 62%)'],
            ['park', 'hsl(106, 22%, 55%)'],
            ['pharmacy', 'hsl(330, 25%, 62%)'],
            ['picnic-site', 'hsl(106, 22%, 55%)'],
            ['playground', 'hsl(106, 22%, 55%)'],
            ['school', 'hsl(38, 25%, 57%)'],
            ['zoo', 'hsl(106, 22%, 55%)'],
          ],
          default: 'hsl(218, 13%, 65%)',
        },
        'text-halo-color': 'hsla(200, 24%, 10%, 0.8)',
        'text-halo-width': 1,
      },
    },
  ],
};
