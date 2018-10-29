export default geojson => map => {
  const sourceId = 'contour-polygon';
  const layerId = 'map-boundary';

  if (map.getSource(sourceId)) {
    map.removeSource(sourceId);
  }
  if (map.getLayer(layerId)) {
    map.removeLayer(layerId);
  }

  if (geojson) {
    map.addSource(sourceId, {
      type: 'geojson',
      data: geojson,
    });

    map.addLayer({
      id: layerId,
      type: 'line',
      source: 'contour-polygon',
      filter: ['==', '$type', 'Polygon'],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        'line-round-limit': 1.05,
      },
      paint: {
        'line-color': '#f00',
        'line-width': 1.5,
        'line-opacity': 1,
        'line-dasharray': {
          base: 1,
          stops: [[6, [2, 0]], [7, [2, 2, 6, 2]]],
        },
      },
    });
  }
};
