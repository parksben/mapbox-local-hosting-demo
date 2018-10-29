import React from 'react';
import ReactDOM from 'react-dom';
import MapboxDraw from 'components/MapboxDraw';
import shenzhenMapSrc from 'constants/map/shenzhen.json';
import points from 'constants/points.json';

ReactDOM.render(
  <MapboxDraw polySrc={shenzhenMapSrc} markers={points} />,
  document.getElementById('react_container')
);
