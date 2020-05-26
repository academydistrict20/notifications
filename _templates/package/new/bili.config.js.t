---
to: packages/<%= h.changeCase.param(pkg) %>/bili.config.js
---
module.exports = {
  output: {
    extractCSS: false,
  },
  input: 'src/index.ts',
  plugins: {
    vue: {
      isWebComponent: true,
      template: { isProduction: true },
      css: true
    }
  },

  externals: ['vue'],
  globals: ['Vue']
}