# Embedding Notifications

You can embed notifications into an html page using native web components or by using vue.js.

## Embedding with Vue

To embed notifications into a vue component you need to import the component  and the relevant plugin you want to use into your vue file.

```js
// Compontent
import Asd20NotificationsEmbed from '@asd20/notifications-embed/src/components/Asd20NotificationsEmbed'
// Plugin
import { Create as CcMessagesPlugin } from '@asd20/notifications-plugin-cc-messages'

```

### Creating config and plugins
Set data config and plugin in the vue data object.

```js
data: () => ({
  config: {
    plugins: [
      CcMessagesPlugin({
      // Configure the plugin...
        endpoint: 'https://mywebsite.com/endpoint'
      // ...
      }),
    ],
  },
})
```

### Passing Props

The Vue Embed Component accepts two props, config object and a groups object. The [config object]('../client') is communicated to the client, specified in the data and passed to the component. The groups prop expects the type of notifications to be specified and the DOM selector in which you want those notifications to appear.

```html
<Asd20NotificationsEmbed
  :config="config"
  :groups="{
      banner: {
        selector: `#header`,
      },
      floating: {
        selector: `aside`,
      },
    }"
  ></Asd20NotificationsEmbed>

```

## Embeding in HTML using web components

The bennefit of a web component is it is an HTML spec supported by all modern browsers that bundles styles and script within the web component.

### Importing the component

```html

  <!-- Vue -->
  <script src="https://unpkg.com/vue"></script>
  <!-- Component -->
  <script src="../../dist/asd20-notifications-embed.umd.js"></script>

  <asd20-notifications-embed></asd20-notifications-embed>

```

### Web Component usage

```js
const el = document.getElementById('my-embed')

// Alter embed components configuration
el.config = {
  plugins: [
    Asd20NotificationsPluginCcMessages.Create({
      endpoint: 'https://asd20-search-dev.search.windows.net',
      index: 'messages-index',
      apiKey: '937716815402758ADC2FE799FE288142',
      apiVersion: '2019-05-06',
      channels: ['Notification'],
      locations: ['District Wide', 'Test Subscription Location'],
      categories: ['Weather', 'Emergency', 'Tests'],
    }),
  ],
}

// Configure groups
el.groups = {
  banner: {
    selector: `#header`,
  },
  floating: {
    selector: `footer`,
  },
}
```
