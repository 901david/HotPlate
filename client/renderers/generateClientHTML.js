// import path from 'path';
// const root = process.cwd();
// const shared = path.join(root, 'shared/util/generateAssets');

// console.log(' WHAT IS THE ROOT???', shared);
import getAssetsForClientChunks from '../../shared/util/generateAssets';


const chunksToRender = [
  'runtime',
  'vendor',
  'app',
];
const assetsForRender = getAssetsForClientChunks(chunksToRender);
function styleTags(styles) {
  return styles
    .map(style =>
      `<link href="${style}" media="screen, projection" rel="stylesheet" type="text/css" />`,
  )
    .join('\n');
}
function scriptTag(jsFilePath) {
  return `<script type="text/javascript" src="${jsFilePath}"></script>`;
}

function scriptTags(jsFilePaths) {
  return jsFilePaths.map(scriptTag).join('\n');
}
const generateHTML = (args) => {
  const { reactApp, helmet } = args;
  let html = `
  <!DOCTYPE html>
    <html>
      <head>
        ${helmet ? helmet.title.toString() : ''}
      </head>
      <body>
        <div id='root'>${reactApp}</div>
        ${scriptTags(assetsForRender.js)}
      </body>
    </html>
  `
  return html;
}
export default generateHTML;
