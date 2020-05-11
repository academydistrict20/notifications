  
const post = async (url: string, options: { params: object | undefined, data: object | undefined, headers: object | undefined }) => {
  const _url = new URL( url )
  let fetchOptions:RequestInit = { method: 'POST' }

  if (options.params) Object.entries(options.params).forEach(([k, v]) => _url.searchParams.append(k, v))
  if (options.data) fetchOptions.body = JSON.stringify(options.data)
  if (options.headers) fetchOptions.headers = options.headers as Headers

  return (await fetch(url, fetchOptions)).json()
}

const defaultSubscriptionLocations = [
  'District Wide',
  'Test Subscription Location'
]
const defaultSubscriptionCategories:string[] = []

export async function getNotification(
  subscribedCategories:string[] = [],
  subscribedLocations:string[] = [],
  apiEndpoint:string,
  apiKey:string,
  apiVersion:string = '2019-05-06'
):Promise<any> {
  if (!apiEndpoint || !apiKey) return []
  let allLocations = [...Array.from(new Set(defaultSubscriptionLocations.concat(subscribedLocations)))]
  let allCategories = [...Array.from(new Set(defaultSubscriptionCategories.concat(subscribedCategories)))]

  const data = await post(apiEndpoint,
      {
        params: {
          'api-version': apiVersion
        },
        data: {
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

        headers: {
          'api-key': apiKey
        }
      }
    )

  return data.value
}