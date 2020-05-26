---
to: packages/<%= h.changeCase.param(pkg) %>/.prettierrc.js
---
module.exports = {
  semi: false,
  trailingComma: "all",
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
};
