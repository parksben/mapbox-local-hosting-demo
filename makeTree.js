const fs = require('fs');
const path = require('path');

function makeHtml(dir) {
  const items = fs.readdirSync(dir).map(file => {
    let str = file;

    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      str += makeHtml(filePath);
    }

    return `<li>${str}</li>`;
  });

  return `<ul>${items.join('')}</ul>`;
}

const dirToShow = process.argv[2] || './';
const treeStr = makeHtml(path.join(__dirname, dirToShow.trim()));

const containerName = 'parksben-is-just-one-single-doge';
const htmlStr = `<style>
  .${containerName} {
    width: 90%;
    max-width: 640px;
    box-sizing: border-box;
    margin: 1em auto;
    padding: 2em;
    background: #333;
    border-radius: 5px;
    overflow: hidden;
    font: 14px/18px Helvetica, Arial, "Microsoft Yahei", Verdana, sans-serif;
    --content-color: #fff;
  }

  .${containerName} ul.tree {
    color: var(--content-color);
  }

  .${containerName} ul.tree,
  .${containerName} ul.tree ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .${containerName} ul.tree ul {
    margin-left: 1em;
  }

  .${containerName} ul.tree li {
    margin: 0;
    padding: 0 1em;
    line-height: 2em;
    font-weight: bold;
    position: relative;
  }

  .${containerName} ul.tree li::before {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background: var(--content-color);
    position: absolute;
    left: 0;
    top: 0;
  }

  .${containerName} ul.tree li::after {
    content: '';
    display: block;
    width: 0.8em;
    height: 1px;
    background: var(--content-color);
    position: absolute;
    left: 0;
    top: 0.9em;
  }

  .${containerName} ul.tree li:last-child::before {
    height: 1em;
    bottom: 1em;
  }
</style>
<div class="${containerName}">
  <ul class="tree">${treeStr.slice(4)}
</div>
`;

fs.writeFileSync(
  path.join(__dirname, './ui/public/tree.html'),
  htmlStr,
  'utf8'
);
console.log('==> Done: the directory tree is saved to ./tree.html');
