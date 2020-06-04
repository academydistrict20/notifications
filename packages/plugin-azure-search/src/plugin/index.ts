import {
  Notification,
  NotificationsByType,
  NotificationsPlugin,
  NotificationsPluginConfig,
  FetchMethod,
} from '@asd20/notifications-shared'
import { Create as CreateJsonNotificationsPlugin } from '@asd20/notifications-plugin-json'

/**
 * A plugin for working with Azure Search data.
 *
 * @export
 * @interface AzureSearchNotificationsPlugin
 * @extends {NotificationsPlugin}
 */

export interface AzureSearchNotificationsPluginConfig extends NotificationsPluginConfig {
  index: string
  apiKey: string
  apiVersion?: string
  filter?: string
  search?: string
  orderBy?: string
  top?: number
  groupByType?(notifications: Notification[]): NotificationsByType
}

/**
 * Creates a new plugin instance, based on the JsonPlugin
 *
 * @param {Partial<AzureSearchNotificationsPluginConfig>} [config]
 * @returns {NotificationsPlugin}
 */
function Create(config: Partial<AzureSearchNotificationsPluginConfig>): NotificationsPlugin {
  // Allow users to override default config
  const resolvedConfig: AzureSearchNotificationsPluginConfig = {
    ...config,
    endpoint: config.endpoint || '',
    index: config.index || '',
    apiKey: config.apiKey || '',
    apiVersion: config.apiVersion || '2019-05-06',
    filter: config.filter || '',
    search: config.search || '*',
    orderBy: config.orderBy || '',
    top: config.top || 10,
  }

  // Validate config, to check for required options
  // Throw errors when validation fails
  if (!resolvedConfig.endpoint) throw new Error('An Azure Search endpoint must be provided.')
  if (!resolvedConfig.apiKey) throw new Error('An Azure API Key must be provided.')

  // Create a new instance of JsonNotificationsPlugin passing in azure search api defaults
  const jsonPluginInstance = CreateJsonNotificationsPlugin({
    endpoint: `${resolvedConfig.endpoint}/indexes/${resolvedConfig.index}/docs/search`,
    requestOptions: {
      method: FetchMethod.POST,
      data: {
        filter: resolvedConfig.filter,
        search: resolvedConfig.search,
        // Azure search expects this all lowercase
        orderby: resolvedConfig.orderBy,
        top: resolvedConfig.top,
      },
      params: {
        'api-version': resolvedConfig.apiVersion || '',
      },
      headers: {
        'content-type': 'application/json',
        'api-key': resolvedConfig.apiKey,
      },
    },
    // The default transformer
    dataTransformer(data) {
      let dataArray: Record<string, unknown>[] = []
      // Flatten the response from Azure Search to return the array from response.value
      if (data && typeof data === 'object') {
        if (
          (data as Record<string, unknown>).hasOwnProperty('value') &&
          Array.isArray((data as Record<string, unknown>).value)
        ) {
          dataArray = (data as Record<string, unknown>).value as Record<string, unknown>[]
        } else {
          dataArray = [data as Record<string, unknown>]
        }
      }
      // Return data, optionally mapping it using a provided data transform function
      return dataArray.map(
        typeof resolvedConfig.dataTransformer === 'function'
          ? resolvedConfig.dataTransformer
          : (d: unknown): unknown => d,
      ) as Record<string, unknown>[]
    },
    propertyMap: resolvedConfig.propertyMap,
  })

  // Default groupByType implementation
  const defaultGroupByType = (notifications: Notification[]): NotificationsByType => {
    return {
      banner: notifications,
      floating: notifications,
      inline: notifications,
      status: notifications,
    }
  }

  // Override the groupByType function to allow for users to pass their own implementation.
  // Fallback to the default implementation if not configured
  jsonPluginInstance.groupByType = resolvedConfig.groupByType || defaultGroupByType

  return jsonPluginInstance
}

export default Create
