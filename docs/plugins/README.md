# Extending with plugins

Notifications is built to be a modular, easily extendable system. Using  plugins, it is easy to support different data sources or integrate with other systems. For example you could add GraphQL support send events to a analytics platform.

## Core plugins (built-in)

* [JSON](../plugins/jsonPlugin.md) - A flexible plugin for using JSON data sources, including HTTP/REST endpoints

## Planned Plugins

* GraphQL - A flexible plugin for using a GraphQl endpoint for querying data
* ICS - Use iCal/CalDav endpoints as notification sources
* RSS - Use RSS feeds as notification sources
* Google Analytics - Generate metrics for notification usage

### Using plugins

### Via imports

```ts
import Asd20NotificationsClient from '@asd20/notifications-client'
import Asd20NotificationsGraphql from '@asd20/notifications-graphql'

// Create the client
const client = Asd20NotificationsClient()

// Use the plugin
client.usePlugin(Asd20NotificationsGraphql({
  endpoint: 'https://mywebsite.com/graphql'
  // ...
}))
```

### Using CDN in HTML/JS

```html
<html>
<body>

<script src="//unpkg.com/@asd20/notifications-client"></script>
<script src="//unpkg.com/@asd20/notifications-graphql"></script>
<script>
// Create the client
const client = Asd20NotificationsClient()

// Use the plugin
client.usePlugin(Asd20NotificationsGraphql({
  endpoint: 'https://mywebsite.com/graphql'
  // ...
}))
</script>

</body>
</html>
```

## Creating you own plugins

> NOTE: This section is a work-in-progress

Creating new plugins is pretty straight forward. To get started, simply install our [hygen](https://www.hygen.io/) generator and create a plugin following the spec.

> **Note:**  
> When naming packages, we recommend using the following naming convention.  
> `asd20-notifications-[your-plugin-name]`

```bash
# Install hygen (https://www.hygen.io/)
npm i -g hygen-add hygen

# Create a project directory
mkdir asd20-notifications-my-plugin
cd asd20-notifications-my-plugin

# Add the generator
hygen-add https://github.com/academydistrict20/notifications-package-generator

# Generate a package
hygen package new
```

### Plugin Specifications

Each plugin should provide a function with returns an object matching the [NotificationsPlugin](https://github.com/academydistrict20/notifications/blob/master/packages/shared/src/plugin.ts) interface.

```ts
// Example simple component
export default function MySimplePlugin(config) {
  return {
    name: 'MySimplePlugin',

    async load() {
      // 1. load notifications from your source
      // 2. Map them to Notifications type
      // 3. Return them
    },

    groupByType(notifications) {
      // Optionally group notification into types as you see fit
      // e.g. Emergency notification into the 'banner' type
    },
    // Optionally define event handlers like beforeDimiss and onClick
    // ...
  }
}
```
