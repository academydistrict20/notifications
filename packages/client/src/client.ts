import { Notification, NotificationsByType } from '@asd20/notifications-shared/src/types'
import { NotificationsPlugin } from '@asd20/notifications-shared/src/plugin'
import { cookieStorage } from '@asd20/notifications-shared/src/storage'

export interface NotificationsUpdatePayload {
  dismissedNotifications: Notification[]
  activeNotifications: Notification[]
  activeNotificationsByType: NotificationsByType
}
export interface NotificationsClientConfig {
  storageKey: string
  storage: Storage
  plugins?: NotificationsPlugin[]
  onUpdate?(payload: NotificationsUpdatePayload): void
  autoLoad: boolean
}

/**
 * Manages notifdication state, plugins,
 * and persistence user interactions.
 *
 * @class NotificationsClient
 */
class NotificationsClient {
  // Default configuration
  public config: NotificationsClientConfig = {
    storageKey: 'asd20-notifications-dimissed-ids',
    storage: cookieStorage,
    plugins: [],
    autoLoad: true,
  }

  private _notifications: Notification[] = []
  private get notifications(): Notification[] {
    return this._notifications
  }
  private set notifications(values) {
    this._notifications = values
    // Because state data has changed, call the
    // update handler so that it can respond.
    this.update()
  }

  private _dismissedNotificationIds: string[] = []
  private get dismissedNotificationIds(): string[] {
    return this._dismissedNotificationIds
  }
  private set dismissedNotificationIds(values) {
    this._dismissedNotificationIds = values

    // Persist in storage
    this.config.storage.setItem(this.config.storageKey, JSON.stringify(values))

    // Because state data has changed, call the
    // update handler so that it can respond.
    this.update()
  }

  /**
   * Returns dismissed notifications
   *
   * @readonly
   * @private
   * @type {Notification[]}
   * @memberof NotificationsClient
   */
  private get dismissedNotifications(): Notification[] {
    return this.notifications.filter((n) => this.dismissedNotificationIds.includes(n.id))
  }

  /**
   * Returns active (not dismissed) notifications
   *
   * @readonly
   * @private
   * @type {Notification[]}
   * @memberof NotificationsClient
   */
  private get activeNotifications(): Notification[] {
    return this.notifications.filter((n) => !this.dismissedNotificationIds.includes(n.id))
  }

  /**
   * Returns an object which contains
   * arrays of notifications by type.
   *
   * @readonly
   * @private
   * @type {NotificationsByType}
   * @memberof NotificationsClient
   */
  private get activeNotificationsByType(): NotificationsByType {
    const plugins = this.config.plugins || []
    const activeNotifications = this.activeNotifications

    const combinedResults = plugins.reduce((types, p) => {
      // If the plugin impliments groupByType
      if (typeof p.groupByType === 'function') {
        // Get groups/types
        const result = p.groupByType(activeNotifications)

        // Loop through all groups/types
        for (const property of Object.keys(result)) {
          // Fixes TS complaining about key type
          const key: keyof NotificationsByType = property as keyof NotificationsByType

          // Get current types nofifications
          const existingNotifications = types[key] || []

          // Combine new array with with existing array for each type
          types[key] = [
            // Existing notifications
            ...existingNotifications,
            // Plus new, filtered notifications
            ...(result[key] || [])
              // Reduce to notifications not already present by id
              .reduce((a, n) => {
                // Try and locate a matching notification by id to determine it exists
                const existing = existingNotifications.find((n2) => n2.id === n.id)
                // If not found, add it to the accumulator/result
                if (!existing) a.push(n)

                return a
              }, [] as Notification[]),
          ]
        }
      }
      return types
    }, {} as NotificationsByType)

    return combinedResults
  }

  /**
   * Creates an instance of NotificationsClient.
   * @param {Partial<NotificationsClientConfig>} [config]
   * @memberof NotificationsClient
   */
  constructor(config?: Partial<NotificationsClientConfig>) {
    // Combine default and passed config
    this.config = { ...this.config, ...config }

    // Load dismissed notification id's from storage (localStorage/cookie)
    if (this.config.storage) {
      //Set values directly, avoiding setter, to prevent triggering onLoad
      this._dismissedNotificationIds = JSON.parse(this.config.storage.getItem(this.config.storageKey) || '[]')
    }

    // Load all notifications
    if (this.config.autoLoad) this.load()
  }

  /**
   * Loads notifications from each configured plugin
   *
   * @returns {Promise<Notification[]>}
   * @memberof NotificationsClient
   */
  async load(): Promise<Notification[]> {
    const plugins = this.config.plugins || []

    // For every plugin, get notifications in parralel
    const results = await Promise.all(plugins.map((p) => p.load()))

    // Store the combined results
    // This will trigger update()
    this.notifications = results.flat()

    // return the results
    return results.flat()
  }

  /**
   * Respond to changed in state and return modified data.
   * Calls onUpdate handler function if present.
   *
   * @returns {NotificationsUpdatePayload}
   * @memberof NotificationsClient
   */
  update(): NotificationsUpdatePayload {
    const payload: NotificationsUpdatePayload = {
      dismissedNotifications: this.dismissedNotifications,
      activeNotifications: this.activeNotifications,
      activeNotificationsByType: this.activeNotificationsByType,
    }

    // Fire update handler if present
    if (typeof this.config.onUpdate === 'function') {
      this.config.onUpdate(payload)
    }

    return payload
  }

  /**
   * Bring back all dismissed notifications
   *
   */
  clearDismissions(): void {
    this.dismissedNotificationIds = []
  }

  /**
   * Dismiss all notifications
   *
   */
  dismissAll(): void {
    // TODO: consider more elaborate dismissal
    // for (const notification of this.activeNotifications) {
    //   this.dismiss(notification)
    // }
    this.dismissedNotificationIds = this.activeNotifications.map((n) => n.id)
  }

  /**
   * Attempts to dismiss a notification,
   * returning true if successful.
   *
   * @param {Notification} notification
   * @returns {boolean}
   * @memberof NotificationsClient
   */
  dismiss(notification: Notification): boolean {
    if (!notification || !notification.id) return false
    const plugins = this.config.plugins || []
    let shouldDimiss = true

    // Loop through each plugin
    for (const plugin of plugins) {
      // If a should dismiss && beforeDismiss guard exists, let plugin decide
      // This way a plugin can prevent dismissal
      if (shouldDimiss && typeof plugin.beforeDismiss === 'function') {
        shouldDimiss = plugin.beforeDismiss(notification)
      }
    }

    if (shouldDimiss) {
      // Add id to array, trigger update() from getter
      this.dismissedNotificationIds = [...this.dismissedNotificationIds, notification.id]

      // Loop through each plugin and call onDismiss if present
      for (const plugin of plugins) {
        if (typeof plugin.onDismiss === 'function') {
          plugin.onDismiss(notification)
        }
      }
    }

    return shouldDimiss
  }
}

export default NotificationsClient
