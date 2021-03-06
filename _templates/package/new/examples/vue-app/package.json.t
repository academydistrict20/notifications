---
to: "<%= useVueComponents ? `packages/${h.changeCase.param(pkg)}/examples/vue-app/package.json` : null %>"
---
{
  "name": "vue-app",
  "version": "1.0.0",
  "description": "",
  "main": "App.vue",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "parcel index.html"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@asd20/notifications-<%= h.changeCase.param(pkg) %>": "file:../..",
    "vue": "^2.6.11"
  },
  "devDependencies": {
    "parcel-bundler": "^1.12.4",
    "vue-hot-reload-api": "^2.3.4"
  }
}
