import hook  from 'css-modules-require-hook'
import path from 'path'
import { jsdom } from 'jsdom'

hook({
  // setting root to the parent directory
  rootDir: path.join(__dirname, '..')
});

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
