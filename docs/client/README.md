# The client

The client provides functionality to the app, like calling the load method on plugins, dismissing notifications, getting dismissed nontifications from storage or tracking internal state and emiting a callback to your application with updated data.

## Import the client

```ts
import Asd20NotificationsClient from '@asd20/notifications-client'

// Create the client
const myClient = new Asd20NotificationsClient()

```

## Using CDN in HTML/JS

```html
<html>
  <body>
    <script src="//unpkg.com/@asd20/notifications-client"></script>
    <script>
      // Create the client
      const myClient = new Asd20NotificationsClient()
    </script>
  </body>
</html>
```

## Client Config

The client optionally accepts config as a paramiter, which allows you to specify plugins, a storage key for dismissed notifications, and a callback function that presents updated notification data.

```ts
  const myConfig = {
    // key for storage
    storageKey: string
    // default is a browser cookie
    storage: Storage
    // specify plugins, optional
    plugins?: NotificationsPlugin[]
    // callback function triggered everytime there is a data change. Exposes dismissedNotifications, activeNotifications and activeNotificationsByType
    onUpdate?(payload: NotificationsUpdatePayload): void
    // If set to true, automatically calls load method to get notifications.
    autoLoad: boolean
  }

```

Pass config into client.

```js
const config = {
  onUpdate(payload) {
    console.log('update', payload)
  },
  plugins: [],
}
const client = new Asd20NotificationsClient(config)
```

## Client Methods

The client has useful methods to help provide basic functionality. Pugins, can overwite that default behavior with their own desired behavior, like providing their own dismiss function.

### Dismiss Method

The default or client dismiss method allows you to dismiss a notification, which will call the onUpdate callback if you have provided it, otherwise it will run the default update method.

### Update Method

The update method returns a payload of dismissedNotifications, activeNotifications and activeNotificationsByType. If dimissed notifications are changed, this also sets the storage.

### Dismiss All

Dismisses all notifications, sets them in storage.

### Clear Dismissions

Clear all the dismissed notifications so they all show up.

To specify api endpoints and map data to ui, [see plugins](../plugins)
