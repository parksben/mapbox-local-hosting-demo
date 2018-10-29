export const stopPropagation = e => {
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
};

export const addResize = (el, cb) => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute(
    'style',
    'width:100%;height:100%;position:absolute;visibility:hidden;margin:0;padding:0;border:0;'
  );
  el.appendChild(iframe);

  let oldWidth = el.offsetWidth;
  let oldHeight = el.offsetHeight;

  function sizeChange() {
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    if (width !== oldWidth || height !== oldHeight) {
      cb(
        { width: width, height: height },
        { width: oldWidth, height: oldHeight }
      );
      oldWidth = width;
      oldHeight = height;
    }
  }

  let timer = 0;
  iframe.contentWindow.onresize = function() {
    clearTimeout(timer);
    timer = setTimeout(sizeChange, 13);
  };
};

export const cos = angle => Math.cos((angle * Math.PI) / 180);
export const sin = angle => Math.sin((angle * Math.PI) / 180);

export const genPentagramPath = (startAngle = 0, outerRadius = 200) => {
  const ratio = cos(36) / cos(72);
  const R = outerRadius;
  const r = R / ratio;

  let start = 0;
  const outterX = -R * sin(start * 36 + startAngle);
  const outterY = -R * cos(start * 36 + startAngle);
  const innerX = -r * sin(start * 36 + startAngle);
  const innerY = -r * cos(start * 36 + startAngle);

  const path = [];
  while (++start < 11) {
    let coordinate;

    if (start % 2 === 0) {
      coordinate = [
        outterX * cos(start * 36) - outterY * sin(start * 36),
        outterX * sin(start * 36) + outterY * cos(start * 36),
      ];
    } else {
      coordinate = [
        innerX * cos(start * 36) - innerY * sin(start * 36),
        innerX * sin(start * 36) + innerY * cos(start * 36),
      ];
    }

    path.push(coordinate);
  }

  return path;
};
