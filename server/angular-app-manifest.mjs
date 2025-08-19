
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://jeet-mesavaniya.github.io/BranchCraft/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/BranchCraft"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 822, hash: 'bd6eb2896b4bcd8df36055da8b7e2df7f428f3dd801f0fa65468b8f0dc0848bd', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1056, hash: 'b7e24b268a212bb4516b17dc2550219e2a6026b5ea3b68f5c64a082cd2aae53d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 6770, hash: '46d5d483ce030e303c08a0f4eb49d29cbd95edf77d6350832bf4f54530b7c421', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-MTJY3PE3.css': {size: 154, hash: 'X+3cTAn33qo', text: () => import('./assets-chunks/styles-MTJY3PE3_css.mjs').then(m => m.default)}
  },
};
