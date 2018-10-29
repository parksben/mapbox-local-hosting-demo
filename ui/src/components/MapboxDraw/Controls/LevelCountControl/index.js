import './style.css';

function stopPropagation(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}

class LevelCountControl {
  constructor(params) {
    const config = {
      title: '',
      levels: [],
      colors: [],
      defaultColor: {
        highlight: '#f00',
        cancel: '#8f8f8f',
      },
      onToggle: () => {},
      ...params,
    };

    this._title = document.createElement('p');
    this._title.className = 'level-count-control-title';
    this._title.textContent = config.title;

    this._legend = document.createElement('div');
    this._legend.className = 'level-count-control-legend';
    config.levels.forEach(({ level, text, count, color }, i) => {
      const levelBtn = document.createElement('div');
      levelBtn.className = 'level-count-control-legend-btn';
      levelBtn.textContent = text;
      levelBtn.title = `总数: ${count}`;

      levelBtn.dataset.level = level;
      levelBtn.dataset.text = text;
      levelBtn.dataset.count = count;
      levelBtn.dataset.color = color || config.colors[i];
      levelBtn.dataset.status = 'on';

      levelBtn.style.backgroundColor = levelBtn.dataset.color;

      this._legend.insertBefore(levelBtn, this._legend.firstChild);
    });

    this._legend.onclick = event => {
      const e = event || window.event;
      const source = e.target || e.srcElement;
      if (source.className.toLowerCase() === 'level-count-control-legend-btn') {
        source.dataset.status = source.dataset.status === 'off' ? 'on' : 'off';
        source.style.backgroundColor =
          source.dataset.status === 'on'
            ? source.dataset.color
            : config.defaultColor.cancel;

        config.onToggle({
          level: Number(source.dataset.level),
          text: source.dataset.text,
          count: Number(source.dataset.count),
          color: source.dataset.color,
          status: source.dataset.status,
        });
      }
      stopPropagation(e);
    };
  }

  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl level-count-control';
    this._container.appendChild(this._title);
    this._container.appendChild(this._legend);
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }

  getDefaultPosition = () => 'bottom-right';
}

export default LevelCountControl;
