import { Notification, NotificationsByType } from '@asd20/notifications-shared/src/types'
import { NotificationsPlugin } from '@asd20/notifications-shared/src/plugin'
import { cookieStorage } from '@asd20/notifications-shared/src/storage'
// import { Create as JsonPlugin } from '@asd20/notifications-plugin-json'

// Interfaces / Types
export interface NotificationsClientConfig {
  storageKey: string
  storage: Storage
  plugins?: NotificationsPlugin[]
  onUpdate?(results: { activeNotificationsByType: NotificationsByType }): void
}

export interface NotificationsClient {
  getDismissedNotifications(): Notification[]
  getActiveNotifications(): Notification[]
  getActiveNotificationsByType(): NotificationsByType
  dismissNotification(notification: Notification): void
  clearDismissions(): void
}

/**
 * Returns a new client instance
 *
 * @returns {NotificationsClient}
 */
const Client = function (config?: Partial<NotificationsClientConfig>): NotificationsClient {
  // Private Variables
  const _config: NotificationsClientConfig = {
    storageKey: 'asd20-notifications-dimissed-ids',
    storage: cookieStorage,
    plugins: [],
    ...config,
  }

  // Private state variables
  let notifications: Notification[] = []
  let dismissedNotificationIds: string[] = []

  // Private Functions
  // TODO: put any functions that you don't want exposed publicly
  // or that people won't need (internal details) here:

  function callUpdateHandler(clientInstance: NotificationsClient): void {
    if (typeof _config.onUpdate === 'function') {
      console.log('sending new updated data')
      _config.onUpdate({ activeNotificationsByType: clientInstance.getActiveNotificationsByType() })
    }
  }

  async function loadNotifications(): Promise<Notification[]> {
    // For every plugin, get notifications
    // Add them together
    const combinedNotifications: Notification[] = []
    for (const plugin of _config.plugins || []) {
      const pluginNotifications: Notification[] = await plugin.load()
      combinedNotifications.concat(pluginNotifications)
    }

    return combinedNotifications
  }

  // Return public client instance
  const instance: NotificationsClient = {
    getDismissedNotifications() {
      return notifications.filter((n) => dismissedNotificationIds.includes(n.id))
    },

    getActiveNotifications() {
      return notifications.filter((n) => !dismissedNotificationIds.includes(n.id))
    },

    getActiveNotificationsByType() {
      const activeNotifications = this.getActiveNotifications()
      // TODO: Utilitize plugins for this
      return {
        banner: activeNotifications.filter((n) => n.categories.includes('Emergency')),
        floating: activeNotifications.filter((n) => n.categories.includes('Urgent')),
        inline: activeNotifications.filter((n) => !n.categories.includes('Emergency' || 'Urgent')),
      }
    },

    /**
     * Brings back all dismissed notifications
     *
     */
    clearDismissions() {
      dismissedNotificationIds = []
      // Persist change in storage
      _config.storage.setItem(_config.storageKey, '[]')
      // Because data has changed, we need to let the consumer of this instance know about it
      // for ecample, a Vue component might want to know
      // that notifications have been undismissed
      // so that it can update the UI
      callUpdateHandler(this)
    },

    /**
     * Dismisses the passed in notification
     *
     * @param {Notification} notification
     */
    dismissNotification(notification: Notification) {
      if (!notification || !notification.id) return
      dismissedNotificationIds.push(notification.id)
      // Update storage
      _config.storage.setItem(_config.storageKey, JSON.stringify(dismissedNotificationIds))

      callUpdateHandler(this)
    },
  }

  // Initialize client
  // ===============

  // Load dismissed notification ids from storage (localStorage/cookie)
  dismissedNotificationIds = JSON.parse(_config.storage.getItem(_config.storageKey) || '[]')

  // Load all notifications
  loadNotifications().then((updatedNotifications) => {
    notifications = updatedNotifications
    // When the client is initialied, we need to trigger an update
    // or send data to the consumer code
    callUpdateHandler(instance)
  })

  return instance
}

// Example us using the client, and passing in a JON plugin
// const myInstance = Client({
//   onUpdate({ activeNotificationsByType }) {
//     console.log(activeNotificationsByType)
//   },
//   plugins: [
//     JsonPlugin({
//       endpoint: 'https://mywebsite.com/notifications.json',
//       requestOptions: {
//         headers: {
//           'api-key': 'my-secret',
//         },
//       },
//     }),
//     JsonPlugin({
//       endpoint: 'https://mywebsite.com/calendars.json',
//       requestOptions: {
//         headers: {
//           'api-key': 'my-secret',
//         },
//       },
//     }),
//     JsonPlugin({
//       endpoint: 'https://mywebsite.com/anncouncements.json',
//       requestOptions: {
//         headers: {
//           'api-key': 'my-secret',
//         },
//       },
//     }),
//   ],
// })

export default Client
