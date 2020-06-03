# Communication Center Messages Plugin

This is a plugin is an extension of the Azure Search Plugin specific to Academy District 20. It assumes an infrastructure using Azure Search and a fixed schema. The config adds a few additional fields like channels, categories, locations and tags. Passing those paramiters in results in automatic UI mapping and filtered queries.

## Implementing the Communication Center Messages Plugin

```js
const myPlugin =
  Asd20NotificationsPluginCcMessages.Create({
    endpoint: '[myEndpoint]',
    index: '[myIndex]',
    apiKey: '[myKey]',
    apiVersion: '2019-05-06',
    search: '',
    channels: ['Notification'],
    locations: ['District Wide', 'Test Subscription Location'],
    categories: ['Weather', 'Emergency', 'Tests']
  }),

```