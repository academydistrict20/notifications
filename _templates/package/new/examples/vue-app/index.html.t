---
to: "<%= useVueComponents ? `packages/${h.changeCase.param(pkg)}/examples/vue-app/index.html` : null %>"
---
<!DOCTYPE html>

<html lang="en">
  <head>
    <title>Example Vue App</title>
  </head>

  <body>
    <div id="app"></div>
    <script src="./main.js"></script>
  </body>
</html>