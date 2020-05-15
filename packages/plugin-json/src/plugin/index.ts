import { request, mapObjectToNotification } from '@asd20/notifications-shared'
import { Notification, NotificationsByType } from '@asd20/notifications-shared/dist/types'
import { NotificationsPlugin, NotificationsPluginConfig } from '@asd20/notifications-shared/dist/plugin'

/**
 * A plugin for working with JSON data.
 * It supports using an HTTP endpoint
 * or passing data in manually.
 *
 * @export
 * @interface JsonNotificationsPlugin
 * @extends {NotificationsPlugin}
 */
export type JsonNotificationsPlugin = NotificationsPlugin

function Create(config?: NotificationsPluginConfig): JsonNotificationsPlugin {
  const jsonPlugin: JsonNotificationsPlugin = {
    name: 'jsonPlugin',

    async load(): Promise<Notification[]> {
      if (!config || !config.endpoint) return []

      let data = await request(config.endpoint, config.requestOptions)

      if (config.dataTransformer && typeof config.dataTransformer === 'function') {
        data = config.dataTransformer(data)
      }

      if (Array.isArray(data)) {
        data = data.map((d) => mapObjectToNotification(d, config.propertyMap))
      } else {
        data = [mapObjectToNotification(data, config.propertyMap)]
      }

      return data
    },

    groupByType(notifications: Notification[]): NotificationsByType {
      return {
        banner: notifications.filter((n) => n.categories.includes('Emergency')),
        floating: notifications.filter((n) => !n.categories.includes('Emergency')),
      }
    },
  }

  return jsonPlugin
}

export default Create
