import { request } from '@asd20/notifications-shared'

/**
 * Creates a Azure Search payload
 *
 * @param {*} state
 * @returns
 */
function generateSearchPayload(state) {
  let query = '*'
  const filters = []
  const now = new Date().toISOString()

  filters.push(
    `status eq 'Published' and ${now} ge publishDateTime  and (expireDateTime eq null or expireDateTime gt ${now})`,
  )

  if (state.organizationIds.length > 0) {
    filters.push(`search.in(ownerOrganizationId, '${state.organizationIds.join(',')}', ',')`)
  }

  if (state.categories.length > 0) {
    filters.push(`categories/any(t: search.in(t, '${state.categories.join(',')}', ',')) `)
  }

  if (state.channels.length > 0) {
    filters.push(`channels/any(t: search.in(t, '${state.channels.join(',')}', ',')) `)
  }

  if (state.tags.length > 0) {
    filters.push(`tags/any(t: search.in(t, '${state.tags.join(',')}', ',')) `)
  }

  if (state.enableFuzzySearch) {
    // Search both by exact phrase and by fuzzy search of event name
    query = state.keywords.trim()
      ? `"${state.keywords.trim()}" OR title:${state.keywords.trim().split(' ').join('* OR title:')}*`
      : '*'
  } else {
    query = state.keywords.trim()
  }

  const payload = {
    count: true,
    queryType: state.enableFuzzySearch ? 'full' : 'simple',
    search: query,
    filter: filters.join(' and '),
    facets: ['categories,count:1000'],
    orderby: 'isDistrictFeatured desc, publishDateTime desc',
    top: state.limit,
  }

  return payload
}

/**
 * Makes a HTTP call to Azure Search for messages
 *
 * @export
 * @param {*} {
 *   keywords = '',
 *   organizationIds = [],
 *   categories = [],
 *   channels = [],
 *   tags = [],
 *   top = 5,
 * }
 * @returns
 */
export default async function queryMessages({
  keywords = '',
  organizationIds = [],
  categories = [],
  channels = [],
  tags = [],
  limit = 5,
  requireKeywords = false,
  indexName = 'messages-index',
}) {
  const env = {
    searchKey: process.env.VUE_APP_AZURE_SEARCH_MESSAGES_KEY || process.env.GRIDSOME_AZURE_MESSAGES_SEARCH_KEY,
    apiVersion: process.env.VUE_APP_AZURE_SEARCH_API_VERSION || process.env.GRIDSOME_AZURE_SEARCH_API_VERSION,
    endpoint: process.env.VUE_APP_AZURE_SEARCH_MESSAGES_ENDPOINT || process.env.GRIDSOME_AZURE_MESSAGES_SEARCH_ENDPOINT,
  }

  if (!keywords && requireKeywords)
    return {
      files: [],
      facets: [],
    }

  const { data } = await axios({
    method: 'post',
    headers: {
      'api-key': env.searchKey,
    },
    params: {
      'api-version': env.apiVersion,
    },
    url: `${env.endpoint}/indexes/${indexName}/docs/search`,
    data: Object.assign(
      {},
      generateSearchPayload({
        keywords,
        organizationIds,
        categories,
        channels,
        tags,
        enableFuzzySearch: true,
        limit,
      }),
      { top: limit },
    ),
  })

  // Return results
  return {
    messages: data.value,
    facets: data['@search.facets'],
    count: data['@odata.count'],
  }
}
