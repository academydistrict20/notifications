import { request, FetchMethod } from './http'
import { DEFAULT_SUBSCRIPTION_LOCATIONS, DEFAULT_SUBSCRIPTION_CATEGORIES } from './constants'

export async function getNotifications(
  subscribedCategories: string[] = [],
  subscribedLocations: string[] = [],
  apiEndpoint: string,
  apiKey: string,
  apiVersion = '2019-05-06',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  if (!apiEndpoint || !apiKey) return []
  const allLocations = [...Array.from(new Set(DEFAULT_SUBSCRIPTION_LOCATIONS.concat(subscribedLocations)))]
  const allCategories = [...Array.from(new Set(DEFAULT_SUBSCRIPTION_CATEGORIES.concat(subscribedCategories)))]

  const data = await request(apiEndpoint, {
    method: FetchMethod.POST,
    params: {
      'api-version': apiVersion,
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
          '|',
        )}', '|')) or categories/any(l: search.in(l, '${allCategories.join(
          '|',
        )}', '|')) and channels/any(l: search.in(l, 'Notification'))`,
      orderby: 'modifiedDateTime asc',
    },

    headers: {
      'api-key': apiKey,
    },
  })

  return data.value
}
