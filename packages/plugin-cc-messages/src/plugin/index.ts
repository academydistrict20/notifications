/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Create as CreateAzureSearchPlugin } from '@asd20/notifications-plugin-azure-search'
import { NotificationsPlugin } from '@asd20/notifications-shared/dist/plugin'
import { Notification, NotificationsByType } from '@asd20/notifications-shared/dist/types'
import { AzureSearchNotificationsPluginConfig } from '@asd20/notifications-plugin-azure-search/dist/plugin'
import { generateAzureSearchPayload } from './helpers'

export interface CCMessagesPluginConfig extends AzureSearchNotificationsPluginConfig {
  organizationIds: string[]
  locations: string[]
  channels: string[]
  categories: string[]
  tags: string[]
  search?: string
  top?: number
  propertyMap?: {
    [P in keyof Notification]?: string
  }
  groupByType?(notifications: Notification[]): NotificationsByType
  dataTransformer?(data: object | object[]): object | object[]
}

/**
 * Creates a new plugin instance, based on the AzureSearchPlugin
 *
 * @param {Partial<CCMessagesPluginConfig>} [config]
 * @returns {NotificationsPlugin}
 */
function Create(config: Partial<CCMessagesPluginConfig>): NotificationsPlugin {
  // Allow users to override default config
  const resolvedConfig: CCMessagesPluginConfig = {
    organizationIds: [],
    locations: [],
    channels: [],
    categories: [],
    tags: [],
    endpoint: '',
    index: '',
    apiKey: '',
    search: '*',
    top: 10,
    ...config,
  }

  // TODO: Generate a payload from the config options passed in
  const payload = generateAzureSearchPayload({
    search: resolvedConfig.search || '*',
    organizationIds: resolvedConfig.organizationIds,
    categories: resolvedConfig.categories,
    channels: resolvedConfig.channels,
    // Order by featured (pinned), then by publish date/time
    orderBy: 'isFeatured desc, publishDateTime desc',
    tags: resolvedConfig.tags,
    top: resolvedConfig.top || 10,
    locations: resolvedConfig.locations,
  })

  // Create a new instance of JsonNotificationsPlugin passing in Azure =Search api config
  const azureSearchPluginInstance = CreateAzureSearchPlugin({
    endpoint: resolvedConfig.endpoint,
    index: resolvedConfig.index,
    apiKey: resolvedConfig.apiKey,
    apiVersion: resolvedConfig.apiVersion,
    search: payload.search,
    filter: payload.filter,
    orderBy: payload.orderby,
    top: payload.top,

    // We need to infer some data from the messages index
    // because not all fields are present there
    dataTransformer(data) {
      // @ts-ignore
      const d: any = Array.isArray(data) ? data[0] : data
      // @ts-ignore
      const links: any[] = JSON.parse(d.links || '[]') || []

      const detailLink = links.find((l) => l.type === 'Detail Link')
      const ctaLink = links.find((l) => l.type === 'Call to Action')

      const importance = d.categories.includes('Urgent')
        ? 'alert'
        : d.categories.includes('Emergency')
        ? 'emergency'
        : 'info'

      return {
        ...data,
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
        banner: notifications.filter((n) => n.categories.includes('Emergency') || n.categories.includes('Urgent')),
        floating: notifications.filter((n) => !n.categories.includes('Emergency') && !n.categories.includes('Urgent')),
        inline: [],
        status: [],
      }
    },
  })

  return azureSearchPluginInstance
}

export default Create
