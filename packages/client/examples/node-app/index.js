const NotificationsClient = require('@asd20/notifications-client')
const JsonPlugin = require('@asd20/notifications-plugin-json')
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
        JsonPlugin.Create({
          endpoint: '',
          requestOptions: {
            method: 'POST',
            data: {
              filter: "locations/any(l: search.in(l, 'District Wide|District Website', '|'))",
            },
            params: {
              'api-version': '',
            },
            headers: {
              'content-type': 'application/json',
              'api-key': '',
            },
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
        }),
      ],
    })
    console.log(client)
  } catch (error) {
    console.log(error)
  }
}
run()
