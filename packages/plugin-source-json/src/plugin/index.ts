import { get } from '@asd20/notifications-shared'
import { FetchRequestOptions } from '@asd20/notifications-shared/dist/helpers'
import { Notification, NotificationsByType } from '@asd20/notifications-shared/dist/types'

export interface JsonSourceItem {
  id: string
  title: string
  summary: string
  description: string
  startDateTime: string
  endDateTime: string
  categories: string[]
}

const jsonSourcePlugin = {
  async loadSourceItems(url: string, options?: FetchRequestOptions): Promise<JsonSourceItem[]> {
    return await get(url, options)
  },
  mapSourceItemToNotification(sourceItem: JsonSourceItem): Notification {
    return {
      id: sourceItem.id,
      title: sourceItem.title,
      summary: sourceItem.summary,
      description: sourceItem.description,
      startDateTime: sourceItem.startDateTime,
      endDateTime: sourceItem.endDateTime,
      categories: sourceItem.categories,
    }
  },
  groupNotificationIntoTypes(notifications: Notification[]): NotificationsByType {
    return {
      banner: notifications.filter((n) => n.categories.includes('Emergency')),
      floating: notifications.filter((n) => !n.categories.includes('Emergency')),
    }
  },
}

export default jsonSourcePlugin
