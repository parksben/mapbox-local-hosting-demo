import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import mapboxgl from 'mapbox-gl';
import LevelCountControl from './Controls/LevelCountControl';
import areaRenderer from './renderers/areaRenderer';
import { scoreToLevel, levelToColor, createMarkers } from './utils';
import MAP_CONFIG from './config';
import MAP_STYLE from './style';
import './mbgl.css';
import './style.css';

export default class MapboxDraw extends Component {
  static propTypes = {
    config: PropTypes.object,
    polySrc: PropTypes.object,
    markers: PropTypes.array,
  };

  static defaultProps = {
    config: {},
    polySrc: null,
    markers: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      levelList: new Array(6).fill(0).map((x, i) => i),
    };
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.markers.length > 0 && !this._levelCountControl) {
      this.addLevelCountControl(nextProps.markers);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !isEqual(this.props.config, nextProps.config) &&
      this.map &&
      this.map.loaded()
    ) {
      this.map.remove();
      this.initMap();
    }

    if (
      !isEqual(this.props.polySrc, nextProps.polySrc) &&
      this.map &&
      this.map.loaded()
    ) {
      this.mainDrawing();
    }

    return (
      !isEqual(this.props.markers, nextProps.markers) ||
      !isEqual(this.state, nextState)
    );
  }

  mainDrawing() {
    // draw polygons on map
    this.drawAreaContour(this.props.polySrc);

    // draw markers
    this.drawMarkers(this.props.markers);

    // add level controller
    if (this.props.markers.length > 0 && !this._levelCountControl) {
      this.addLevelCountControl(this.props.markers);
    }
  }

  initMap() {
    // create map instance
    this.map = new mapboxgl.Map({
      container: 'map_container',
      ...MAP_CONFIG,
      style: MAP_STYLE,
      ...this.props.config,
    });

    // add fullscreen control
    this.map.addControl(new mapboxgl.FullscreenControl());

    // add navigation control
    this.map.addControl(new mapboxgl.NavigationControl());

    // draw layers async
    this.map.on('load', () => {
      this.mainDrawing();
    });
  }

  addLevelCountControl = markers => {
    this._levelCountControl = new LevelCountControl({
      title: 'XX指数',
      levels: new Array(6).fill(0).map((c, i) => ({
        level: i,
        count: markers.filter(({ value }) => scoreToLevel(value) === i).length,
        text: i === 0 ? '0' : `${(i - 1) * 20 + 1}-${i * 20}`,
      })),
      colors: new Array(6).fill(0).map((n, i) => levelToColor(i)),
      onToggle: ({ level }) => this.toggleLevel(level),
    });

    this.map.addControl(this._levelCountControl);
  };

  toggleLevel(level) {
    let newList = this.state.levelList;

    if (newList.includes(level)) {
      newList = newList.filter(x => x !== level);
    } else {
      newList = newList.concat([level]);
    }

    this.setState({
      levelList: newList,
    });
  }

  drawAreaContour = geojson => areaRenderer(geojson)(this.map);

  drawMarkers(list) {
    if (this.markers && this.markers.length > 0) {
      this.markers.forEach(m => m.remove());
    }

    if (list.length > 0) {
      this.markers = createMarkers(list, this.map);
    }
  }

  render = () => (
    <div
      className={`mb-draw ${this.state.levelList
        .map(lv => `show-lv_${lv}`)
        .join(' ')}`}
    >
      <div id="map_container" className="mb-drawer" />
    </div>
  );
}
