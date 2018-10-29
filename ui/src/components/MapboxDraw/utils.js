import mapboxgl from 'mapbox-gl';

const ICON_SIZE = [50, 50];

export const LEVEL_COLORS = [
  '#bbb',
  '#00ff00',
  '#58bd77',
  '#0075ff',
  '#ffb300',
  '#f12020',
];

export const htmlToElement = html => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.childNodes[0];
};

export const scoreToLevel = score => (score > 0 ? Math.ceil(score / 20) : 0);

export const levelToColor = level => LEVEL_COLORS[level];

let popup = null;
export const popupSingleton = () => {
  if (!popup) {
    popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: [0, -ICON_SIZE[1]],
    });
  }
  return popup;
};

export const dataToMarker = ({ name, lnglat, value }, map) => {
  const markerHtml = `<svg class="mlevel mlevel_${scoreToLevel(
    value
  )}" style="width:${ICON_SIZE[0]}px;height:${
    ICON_SIZE[1]
  }px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="${levelToColor(
    scoreToLevel(value)
  )}" d="M512 85.333333c-164.949333 0-298.666667 133.738667-298.666667 298.666667 0 164.949333 298.666667 554.666667 298.666667 554.666667s298.666667-389.717333 298.666667-554.666667c0-164.928-133.717333-298.666667-298.666667-298.666667z m0 448a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z" /></svg>`;
  const popupHtml = [`<strong>${name}</strong>`, `${value}`]
    .map(x => `<p style="color:#333;font-size:12px;line-height:18px;">${x}</p>`)
    .join('');
  const markerCoord = lnglat.split(',').map(Number);

  const el = htmlToElement(markerHtml);
  if (map) {
    el.addEventListener(
      'mouseenter',
      () => {
        popupSingleton()
          .setLngLat(markerCoord)
          .setHTML(popupHtml)
          .addTo(map);
      },
      false
    );
    el.addEventListener(
      'mouseleave',
      () => {
        popupSingleton().remove();
      },
      false
    );
  }

  const marker = new mapboxgl.Marker(el, {
    offset: [0, -ICON_SIZE[1] / 2],
  }).setLngLat(markerCoord);

  return map ? marker.addTo(map) : marker;
};

export const createMarkers = (list, map) => list.map(d => dataToMarker(d, map));

export const createPointLayer = (list, map) => {
  map.addSource('marker-points', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: list.map(({ name, lnglat, value }) => ({
        type: 'Feature',
        properties: {
          name,
          value,
        },
        geometry: {
          type: 'Point',
          coordinates: lnglat.split(',').map(Number),
        },
      })),
    },
  });

  map.addLayer({
    id: 'location_markers',
    type: 'fill',
    source: 'marker-points',
    paint: {
      'fill-color': '#888888',
      'fill-opacity': 0.4,
    },
    filter: ['==', '$type', 'Polygon'],
  });

  map.addLayer({
    id: 'park-volcanoes',
    type: 'circle',
    source: 'marker-points',
    paint: {
      'circle-radius': 6,
      'circle-color': '#B42222',
    },
    filter: ['==', '$type', 'Point'],
  });
};
