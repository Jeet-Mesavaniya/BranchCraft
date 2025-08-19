
export default {
  basePath: 'https://jeet-mesavaniya.github.io/BranchCraft',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
