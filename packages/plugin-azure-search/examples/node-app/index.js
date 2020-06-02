const NotificationsClient = require('@asd20/notifications-client')
const MessagesPlugin = require('@asd20/notifications-plugin-cc-messages')
const fetch = require('node-fetch')

// Enable fetcch support globally
if (!globalThis.fetch) {
  globalThis.fetch = fetch
}

async function run() {
  try {
    const client = new NotificationsClient({
      onUpdate(payload) {
        console.log('update', payload)
      },
      plugins: [
        MessagesPlugin.Create({
          endpoint: 'https://asd20-search-dev.search.windows.net',
          index: 'messages-index',
          apiKey: '937716815402758ADC2FE799FE288142',
          apiVersion: '2019-05-06',
          search: 'COVID-19',
          channels: ['News & Stories'],
        }),
      ],
    })
    console.log(client)
  } catch (error) {
    console.log(error)
  }
}
run()
