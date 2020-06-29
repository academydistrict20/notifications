export interface AzureSearchPayload {
  search?: string
  filter?: string
  orderby?: string
  top?: number
}

/**
 * Creates a Azure Search payload
 *
 * @param {{
 *     // Type definitions
 *     organizationIds: string[]
 *     categories: string[]
 *     channels: string[]
 *     tags: string[]
 *     search: string
 *     top: number
 *     orderBy: string
 *     locations: string[]
 *   }} [state={
 *     // Default values
 *     organizationIds: [],
 *     categories: [],
 *     channels: [],
 *     tags: [],
 *     search: '*',
 *     top: 10,
 *     orderBy: 'isDistrictFeatured desc, publishDateTime desc',
 *     locations: [],
 *   }]
 * @returns {AzureSearchPayload}
 */
export function generateAzureSearchPayload(
  state: {
    // Type definitions
    organizationIds: string[]
    categories: string[]
    channels: string[]
    tags: string[]
    search: string
    top: number
    orderBy: string
    locations: string[]
  } = {
    // Default values
    organizationIds: [],
    categories: [],
    channels: [],
    tags: [],
    search: '*',
    top: 10,
    orderBy: 'isDistrictFeatured desc, publishDateTime desc',
    locations: [],
  },
): AzureSearchPayload {
  const filters: string[] = []
  const now = new Date().toISOString()
  // get domain and add it to the locations
  if (typeof window !== 'undefined') {
    state.locations.push(window.location.host)
  }

  filters.push(
    `status eq 'Published' and ${now} ge publishDateTime  and (expireDateTime eq null or expireDateTime gt ${now})`,
  )

  if (state.organizationIds.length > 0) {
    filters.push(`search.in(ownerOrganizationId, '${state.organizationIds.join('|')}', '|')`)
  }

  if (state.categories.length > 0) {
    filters.push(`categories/any(t: search.in(t, '${state.categories.join('|')}', '|')) `)
  }

  if (state.channels.length > 0) {
    filters.push(`channels/any(t: search.in(t, '${state.channels.join('|')}', '|')) `)
  }

  if (state.tags.length > 0) {
    filters.push(`tags/any(t: search.in(t, '${state.tags.join('|')}', '|')) `)
  }
  if (state.locations && state.locations.length > 0) {
    filters.push(`destinations/any(t: search.in(t, '${state.locations.join('|')}', '|')) `)
  }

  const payload = {
    search: state.search,
    filter: filters.join(' and '),
    orderby: state.orderBy,
    top: state.top,
  }

  return payload
}
