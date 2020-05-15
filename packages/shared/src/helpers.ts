import get from 'lodash/get'
import { Notification, notificationFactory } from './types'

export function mapObjectToNotification(
  source: object,
  propertyMap?: { [P in keyof Notification]?: string },
): Notification {
  // Create new notification with default values
  const notification: Notification = notificationFactory(source)

  // Using any available propertyMaps, set values
  if (propertyMap) {
    for (const property in propertyMap) {
      const value = get(source, propertyMap[property as never])
      if (value) {
        notification[property as never] = value
      }
    }
  }

  return notification
}
