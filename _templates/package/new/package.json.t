---
to: packages/<%= h.changeCase.param(pkg) %>/package.json
---
{
  "name": "@asd20/notifications-<%= h.changeCase.param(pkg) %>",
  "version": "0.1.0",
  "description": "<%= desc %>",
  "author": "Academy District 20 <socialmedia@asd20.org>",
  "license": "MIT",
  "homepage": "https://github.com/academydistrict20/notifications#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/academydistrict20/notifications.git"
  },
  "publishConfig": {
    "access": "public"
  },
  "bugs": {
    "url": "https://github.com/academydistrict20/notifications/issues"
  },
  "main": "dist/asd20-notification-<%= h.changeCase.param(pkg) %>.cjs.js",
  "module": "dist/asd20-notification-<%= h.changeCase.param(pkg) %>.esm.js",
  "browser": "dist/asd20-notification-<%= h.changeCase.param(pkg) %>.esm.min.js",
  "unpkg": "dist/asd20-notification-<%= h.changeCase.param(pkg) %>.umd.js",
  "jsdelivr": "dist/asd20-notification-<%= h.changeCase.param(pkg) %>.umd.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist/*.js",
    "dist/index.d.ts",
    "README.md"
  ],
  "browserslist": {
    "modern": [
      "> 0.5%",
      "last 2 versions",
      "not dead",
      "not IE 9-11"
    ],
    "compat": [
      "last 2 versions",
      "> 0.5%",
      "ie 11"
    ],
    "node": [
      "node 12"
    ]
  },
  "scripts": {
    "test": "jest --collect-coverage --passWithNoTests",
    "test:watch": "jest --watch-all --collect-coverage -passWithNoTests",
    "lint": "tsc --noEmit && eslint '*/**/*.{js,ts,tsx}' --quiet --fix",
    "prepublish": "npm run build",
    "build": "npm run build:esm && npm run build:esm:min && npm run build:cjs && npm run build:cjs:min && npm run build:umd && npm run build:umd:min",
    "build:esm": "export BROWSERSLIST_ENV=modern && bili --banner -t browser --format esm --input.index src/index.ts --bundle-node-modules --file-name asd20-notification-<%= h.changeCase.param(pkg) %>.esm.js",
    "build:esm:min": "export BROWSERSLIST_ENV=modern && bili --banner -t browser --format esm --input.index src/index.ts --bundle-node-modules --minify --file-name asd20-notification-<%= h.changeCase.param(pkg) %>.esm.min.js",
    "build:cjs": "export BROWSERSLIST_ENV=compat && bili --banner -t browser --format cjs --input.index src/index.ts --file-name asd20-notification-<%= h.changeCase.param(pkg) %>.cjs.js",
    "build:cjs:min": "export BROWSERSLIST_ENV=compat && bili --banner -t browser --format cjs --input.index src/index.ts --minify --file-name asd20-notification-<%= h.changeCase.param(pkg) %>.cjs.min.js",
    "build:umd": "export BROWSERSLIST_ENV=compat && bili --banner -t browser --format umd --input.index src/index.ts --bundle-node-modules --module-name Asd20Notifications<%= h.changeCase.pascal(pkg) %> --file-name asd20-notification-<%= h.changeCase.param(pkg) %>.umd.js",
    "build:umd:min": "export BROWSERSLIST_ENV=compat && bili --banner -t browser --format umd --input.index src/index.ts --bundle-node-modules --module-name Asd20Notifications<%= h.changeCase.pascal(pkg) %> --minify --file-name asd20-notification-<%= h.changeCase.param(pkg) %>.umd.min.js"
  },
<% if(locals.useVueComponents){ -%>
  "devDependencies": {
    "rollup-plugin-vue": "^5.0.0",
    "vue-template-compiler": "^2.6.11"
  },
  "peerDependencies": {
    "vue": "^2.6.11"
  },
  "dependencies": {
    "@vue/web-component-wrapper": "^1.2.0"
  },
<% } -%>
  "husky": {
    "hooks": {
      "pre-commit": "npx tsc --noEmit && lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,ts,tsx}": [
      "eslint --cache --fix",
      "git add"
    ]
  }
}
