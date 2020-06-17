import { Create as CreateAzureSearchPlugin } from '@asd20/notifications-plugin-azure-search'
import { NotificationsPlugin, Notification, NotificationsByType } from '@asd20/notifications-shared'
import { AzureSearchNotificationsPluginConfig } from '@asd20/notifications-plugin-azure-search/dist/plugin'
import { generateAzureSearchPayload } from './helpers'

export interface CCMessagesPluginConfig extends AzureSearchNotificationsPluginConfig {
  organizationIds: string[]
  locations: string[]
  channels: string[]
  categories: string[]
  tags: string[]
}

interface CcLink {
  type: string
  title: string
  url: string
}

/**
 * Creates a new plugin instance, based on the AzureSearchPlugin
 *
 * @param {Partial<CCMessagesPluginConfig>} [config]
 * @returns {NotificationsPlugin}
 */
function Create(config: Partial<CCMessagesPluginConfig>): NotificationsPlugin {
  // Generate a payload from the config options passed in
  const payload = generateAzureSearchPayload({
    search: config.search || '*',
    organizationIds: config.organizationIds || [],
    categories: config.categories || [],
    channels: config.channels || [],
    tags: config.tags || [],
    top: config.top || 10,
    locations: config.locations || [],
    // Order by featured (pinned), then by publish date/time
    orderBy: 'isFeatured desc, publishDateTime desc',
  })

  // Create a new instance of JsonNotificationsPlugin passing in Azure =Search api config
  const azureSearchPluginInstance = CreateAzureSearchPlugin({
    endpoint: config.endpoint,
    index: config.index,
    apiKey: config.apiKey,
    apiVersion: config.apiVersion,
    search: payload.search,
    filter: payload.filter,
    orderBy: payload.orderby,
    top: payload.top,

    // We need to infer some data from the messages index
    // because not all fields are present there
    dataTransformer(data) {
      // if (typeof data === 'object' && (data as object).values)
      const d = Array.isArray(data) ? data[0] : data
      const links: unknown[] = JSON.parse(d.links || '[]') || []

      const detailLink = links.find((l) => (l as CcLink).type === 'Detail Link') as CcLink | undefined
      const ctaLink = links.find((l) => (l as CcLink).type === 'Call to Action') as CcLink | undefined

      const importance = d.categories.includes('Urgent')
        ? 'alert'
        : d.categories.includes('Emergency')
        ? 'emergency'
        : 'info'

      return {
        ...d,
        callToActionUrl: ctaLink ? ctaLink.url : '',
        callToActionLabel: ctaLink ? ctaLink.title : '',
        detailLinkUrl: detailLink ? detailLink.url : '',
        detailLinkLabel: detailLink ? detailLink.title : '',
        // Could be 'info, alert, emergency, success'
        importance, // infer from categories ()
        // Inferred from importance if you don't specify
        icon: '', // infer from categories
        // Inferred from importance if you don't specify
        color: '', // infer from categories (what about weather status?)
      }
    },
    // Provide map from search index data (after dataTransformer)
    // to notification props.
    // The underlying JSON plugin use this to translate fields.
    propertyMap: {
      id: 'id',
      title: 'title',
      description: 'summary',
      startDateTime: 'publishDateTime',
      endDateTime: 'expireDateTime',
      categories: 'categories',
      callToActionUrl: 'callToActionUrl',
      callToActionLabel: 'callToActionLabel',
      detailLinkUrl: 'detailLinkUrl',
      detailLinkLabel: 'detailLinkLabel',
      icon: 'icon',
      color: 'color',
      importance: 'importance',
    },
    groupByType(notifications: Notification[]): NotificationsByType {
      // TODO: This could be fragile, consider handeling case sensitivity
      return {
        banner: notifications.filter(
          (n) =>
            n.categories.includes('Emergency') ||
            (n.categories.includes('Urgent') && !n.categories.includes('Weather')),
        ),
        floating: notifications.filter(
          (n) =>
            !n.categories.includes('Emergency') &&
            !n.categories.includes('Urgent') &&
            !n.categories.includes('Weather'),
        ),
        inline: [],
        status: notifications.filter((n) => n.categories.includes('Weather')),
      }
    },
  })

  return azureSearchPluginInstance
}

export default Create
