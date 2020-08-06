import { Create as CreateAzureSearchPlugin } from '@asd20/notifications-plugin-azure-search'
import {
  NotificationsPlugin,
  Notification,
  NotificationsByType,
  NotificationImportance,
  NotificationTypes,
} from '@asd20/notifications-shared'
import { AzureSearchNotificationsPluginConfig } from '@asd20/notifications-plugin-azure-search/dist/plugin'
import { generateAzureSearchPayload } from './helpers'

export interface DisplayRule {
  terms: string[]
  type: NotificationTypes
  importance?: NotificationImportance
  icon?: string
  color?: string
}

export interface CCMessagesPluginConfig extends AzureSearchNotificationsPluginConfig {
  organizationIds: string[]
  destinations: string[]
  channels: string[]
  categories: string[]
  tags: string[]
  displayRules: DisplayRule[]
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
    destinations: config.destinations || [],
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
    dataTransformer(data: unknown[]) {
      // if (typeof data === 'object' && (data as object).values)
      const d = Array.isArray(data) ? data[0] : data
      const links: unknown[] = JSON.parse(d.links || '[]') || []

      const detailLink = links.find((l) => (l as CcLink).type === 'Detail Link') as CcLink | undefined
      const ctaLink = links.find((l) => (l as CcLink).type === 'Call to Action') as CcLink | undefined

      const matchingRules = (config.displayRules || [])
        .map((r) => {
          const terms = r.terms.join('|').toLowerCase().trim().split('|')
          const categories = (d.categories || []).join('|').toLowerCase().split('|')
          const tags = (d.tags || []).join('|').toLowerCase().split('|')

          let matches = 0

          // Loop through each term
          for (const term of terms) {
            if (categories.includes(term)) {
              matches++
            }
            if (tags.includes(term)) {
              matches++
            }
          }

          // Make sure that the number of matched for all terms
          // is at least the same amount as there are terms
          return { matches, rule: r }
        })
        .filter((r) => r.matches > 0 && r.matches >= r.rule.terms.length)
        // Put the hisest scoring match at the top
        .sort((a, b) => {
          if (a.matches > b.matches) return -1
          if (a.matches < b.matches) return 1
          return 0
        })

      const matchingRule = matchingRules.length > 0 ? matchingRules[0].rule : null

      return {
        ...d,
        callToActionUrl: ctaLink ? ctaLink.url : '',
        callToActionLabel: ctaLink ? ctaLink.title : '',
        detailLinkUrl: detailLink ? detailLink.url : '',
        detailLinkLabel: detailLink ? detailLink.title : '',
        // Could be 'info, alert, emergency, success'
        importance: matchingRule && matchingRule.importance ? matchingRule.importance : 'info',
        // Inferred from importance if you don't specify
        icon: matchingRule && matchingRule.icon ? matchingRule.icon : '',
        // Inferred from importance if you don't specify
        color: matchingRule && matchingRule.color ? matchingRule.color : '',
        type: matchingRule && matchingRule.type ? matchingRule.type : '',
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
      type: 'type',
      icon: 'icon',
      color: 'color',
      importance: 'importance',
    },
    groupByType(notifications: Notification[]): NotificationsByType {
      return {
        banner: notifications.filter((n) => n.type === NotificationTypes.BANNER),
        inline: notifications.filter((n) => n.type === NotificationTypes.INLINE),
        status: notifications.filter((n) => n.type === NotificationTypes.STATUS),
        floating: notifications.filter((n) => n.type === NotificationTypes.FLOATING || !n.type),
      }
    },
  })

  return azureSearchPluginInstance
}

export default Create
