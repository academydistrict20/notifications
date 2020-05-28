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
          endpoint: 'https://asd20-website-search.search.windows.net/indexes/notifications-index/docs/search',
          requestOptions: {
            method: 'POST',
            data: {
              filter: "locations/any(l: search.in(l, 'District Wide|District Website', '|'))",
            },
            params: {
              'api-version': '2019-05-06',
            },
            headers: {
              'content-type': 'application/json',
              'api-key': '7A4D45B66F49A896624C0BFE09D73277',
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
