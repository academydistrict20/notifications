import axios from 'axios'

let defaultSubscriptionLocations = [
  'District Wide',
  'Test Subscription Location'
]
let defaultSubscriptionCategories = []
// ['Weather', 'Emergency', 'Urgent']

export function getNotification(
  subscribedCategories,
  subscribedLocations,
  apiEndpoint = process.env.SEARCH_ENDPOINT
) {
  // const now = new Date().toISOString()

  let allLocations = []
  if (subscribedLocations) {
    defaultSubscriptionLocations.push(subscribedLocations)
    allLocations = defaultSubscriptionLocations.reduce((a, c) => {
      a = a.concat(c)
      return a
    }, [])
  } else {
    allLocations = defaultSubscriptionLocations
  }
  let allCategories = []
  if (subscribedCategories) {
    defaultSubscriptionCategories.push(subscribedCategories)
    allCategories = defaultSubscriptionCategories.reduce((a, c) => {
      a = a.concat(c)
      return a
    }, [])
  } else {
    allCategories = defaultSubscriptionCategories
  }
  return axios
    .post(
      apiEndpoint,
      {
        filter:
          // GOOD QUERY
          // `publishDateTime le ${now} and expireDateTime gt ${now} and messageSubscriptionLocations/any(l: search.in(l, '${allLocations.join(
          //   '|'
          // )}', '|')) and categories/any(l: search.in(l, '${allCategories.join(
          //   '|'
          // )}', '|')) and channels/any(l: search.in(l, 'Notification'))`,
          `messageSubscriptionLocations/any(l: search.in(l, '${allLocations.join(
            '|'
          )}', '|')) or categories/any(l: search.in(l, '${allCategories.join(
            '|'
          )}', '|')) and channels/any(l: search.in(l, 'Notification'))`,
        orderby: 'modifiedDateTime asc'
      },
      {
        params: {
          'api-version': '2019-05-06'
        },
        headers: {
          'api-key': process.env.SEARCH_QUERY_KEY
        }
      }
    )
    .then(response => {
      return response.data.value
    })
}
