---
to: "<%= useVueComponents ? `packages/${h.changeCase.param(pkg)}/examples/web-app/index.html` : null %>"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example Web App</title>
</head>
<body>
  <!-- Load Vue -->
  <script src="https://unpkg.com/vue"></script>
  <!-- Load the library -->
  <script src="../../dist/asd20-notification-<%= h.changeCase.param(pkg) %>.umd.js"></script>
  <!-- Note: In production, you can use a CDN url
  <script src="https://unpkg.com/asd20-notification-<%= h.changeCase.param(pkg) %>"></script>
  -->

  <!-- Example #1: Using a UMD package with global scope -->
  <script>
    console.log(Asd20Notifications<%= h.changeCase.pascal(pkg) %>.sayHello('from global scope'))
  </script>

  <!-- Example #2: Using a web component -->
  <asd20-say-hello name="from Web Component"/>
  
</body>
</html>