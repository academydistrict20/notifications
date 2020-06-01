# Extending with plugins

Notifications is built to be a modular, easily extendable system. Using  plugins, it is easy to support different data sources or integrate with other systems. For example you could add GraphQL support send events to a analytics platform.

## Core plugins (built-in)

* [JSON](../plugins/jsonPlugin.md) - A flexible plugin for using JSON data sources, including HTTP/REST endpoints

## Planned Plugins

* GraphQL - A flexible plugin for using a GraphQl endpoint for querying data
* ICS - Use iCal/CalDav endpoints as notification sources
* RSS - Use RSS feeds as notification sources
* Google Analytics - Generate metrics for notification usage

## Using plugins

### Via imports

```ts
import Asd20NotificationsClient from '@asd20/notifications-client'
import Asd20NotificationsPluginJson from '@asd20/notifications-graphql'

// Create the client
const myClient = new Asd20NotificationsClient()

// Use the plugin passing into config
const myClient = Asd20NotificationsClient({
  plugins: [
    // Use the plugin
    Asd20NotificationsJson({
      // Configure the plugin...
      endpoint: 'https://mywebsite.com/endpoint'
      // ...
    })
  ]
})
```

### Using CDN in HTML/JS

```html
<html>
<body>

<script src="//unpkg.com/@asd20/notifications-client"></script>
<script src="//unpkg.com/@asd20/notifications-plugin-json"></script>
<script>
// Create the client
const myClient = Asd20NotificationsClient({
  plugins: [
    // Use the plugin
    Asd20NotificationsJson({
      // Configure the plugin...
      endpoint: 'https://mywebsite.com/endpoint'
      // ...
    })
  ]
})
</script>

</body>
</html>
```

## Creating your own plugins

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
    /**
     * The unique name of the plugin.
     *
     * e.g. 'jsonPlugin'
     *
     * @type {string}
     * @memberof NotificationsPlugin
     */
    name: 'MyPlugin'
    /**
     * Loads notifications.
     *
     * @returns {Promise<Notification[]>}
     * @memberof NotificationsPlugin
     */
    async load() {
      // 1. Load notifications from a source (e.g. API / file, etc.)
      // 2. Map data to an array notifications
      // 3. return the array
    }
    /**
     * Given an array of notification,
     * return notifications grouped by type.
     *
     * @param {Notification[]} notifications
     * @returns {NotificationsByType}
     * @memberof NotificationsPlugin
     */
    groupByType(notifications) {
      // Return an object with properties for each type of notification
      return {
        banner: [],
        floating: [],
        inline: [],
        status: []
      }
    },
    /**
     * Return false to prevent dismission
     *
     * @param {Notification} notification
     * @returns {boolean}
     * @memberof NotificationsPlugin
     */
    beforeDismiss(notification) {
      // Your plugin can optionally Decide if it's ok to dismiss a notification
      return true
    }
    /**
     * Called when a notification has been dismissed
     *
     * @param {Notification} notification
     * @memberof NotificationsPlugin
     */
    onDismiss(notification) {
      // Your plugin could react to a notification being dismissed.
      // For example, you could trigger an analytics event
    }
    /**
     * Called when a notification has been clicked
     *
     * @param {Notification} notification
     * @memberof NotificationsPlugin
     */
    onClick(notification) {
      // Your plugin could react to a notification being clicked.
      // For example, you could trigger an analytics event
    }
  },
}
```

### Plugin Configuration

When using plugins, users can pass in configuration. This can be different for each plugin, but by default it looks something like the following:




```ts
const jsonPlugin: JsonNotificationsPlugin = {
    name: 'azureSearchPlugin',

    async load(): Promise<Notification[]> {
      if (!config || !config.endpoint) return []
      const config: NotificationsPluginConfig = {
        ...config,
        config: {
          data: {
            allCategories: ['Weather'],
            allLocations: ['District'],
          },
          endpoint: 'https://asd20-search-dev.search.windows.net/indexes/messages-index/docs/search',
          requestOptions: {
            method: 'POST',
          },
          dataTransformer(data) {
            return data.value.map((d) => ({
              id: d.id,
              title: d.title,
              summary: d.description,
              description: d.description,
              startDateTime: d.startDateTime,
              endDateTime: d.endDateTime,
              categories: d.categories,
            }))
          },
        },
      }

      let data = await request(config.endpoint, config.requestOptions)
      if (config.dataTransformer && typeof config.dataTransformer === 'function') {
        data = config.dataTransformer(data)
      }

      if (Array.isArray(data)) {
        data = data.map((d) => mapObjectToNotification(d, config.propertyMap))
      } else {
        data = [mapObjectToNotification(data, config.propertyMap)]
      }

      return data
    },

    groupByType(notifications: Notification[]): NotificationsByType {
      return {
        banner: notifications.filter((n) => n.categories.includes('Emergency')),
        floating: notifications.filter((n) => !n.categories.includes('Emergency')),
      }
    },
  }
```