# Azure Search Plugin

The Azure Search Plugin is an extension of the "[JSON plugin](../plugins/README.md)". It makes assumptions about the defaults and the fields accompanied in an azure search api call and passes them down into the JSON plugin.

## Example Usage

```js
const myConfig = {
  endpoint: '[myAPIEndpoint]',
  index: '[mySearchIndex]',
  apiKey: '[myAzureSearchKey]',
  apiVersion: '2019-05-06',
  search: 'Emergency Test',
}
```