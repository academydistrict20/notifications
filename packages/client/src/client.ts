import {
  getPluginNotifications,
  dismissNotification,
  getDismissedNotifications,
  defaultConfig,
} from './functions/initPlugins'

import { NotificationsPlugin } from '@asd20/notifications-helpers/src/plugin'
import { Notification, NotificationsByType } from '@asd20/notifications-helpers/src/types'

// Definitions
export interface NotificationsClientConfig {
  storageKey: string
  storage?: Storage
  plugins?: NotificationsPlugin[]
}
export interface NotificationsClient {
  config: NotificationsClientConfig
  notifications: Notification[]
  notificationsBytype: NotificationsByType[]
  dismissedNotifications: string[]
  dismissedNotificationsInStorage: string[]
  dismissNotification(notificationId: string): void
  getDismissedNotifications(): void
  getPluginNotifications(): Notification[]
}

// Create the function to initialize client with defaultConfig
// How do I import all plugins?
export function Client(config?: NotificationsClientConfig) {
  const c: NotificationsClientConfig = config ? config : defaultConfig
  return {
    config: c,
    notifications: getPluginNotifications(c.plugins),
    dismissedNotifications: [],
    dismissedNotificationsInStorage: [],
    dismissNotification(),
    getDismissedNotifications()

  }
}
