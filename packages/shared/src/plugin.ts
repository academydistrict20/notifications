import { FetchRequestOptions } from './http'
import { Notification, NotificationsByType } from './types'

/**
 * Plugin configuration
 *
 * @export
 * @interface NotificationsPluginConfig
 */
export interface NotificationsPluginConfig {
  /**
   * JSON data to be transformed into notifications
   *
   * @type {(object | object[])}
   */
  data?: object | object[]
  /**
   * A function that transforms input data
   * before it is read for notifications.
   *
   * Usefull for flattening a nested JSON objects
   * or filtering out certain elements.
   *
   * @param {(object | object[])} data
   * @returns {(object | object[])}
   */
  dataTransformer?(data: object | object[]): object | object[]
  /**
   * The url or endpoint to make a HTTP request.
   *
   * e.g. https://mysite.com/notifications.json
   *
   * @type {string}
   */
  endpoint?: string
  /**
   * Options for request being made
   *
   * @type {FetchRequestOptions}
   * @memberof NotificationsPluginConfig
   */
  requestOptions?: FetchRequestOptions
  /**
   * Set of key, path pairs.
   * Used to map input JSON propertiess
   * with Notification properties.
   *
   * e.g.
   * {
   *   title: 'path.to.title'
   * }
   *
   * @type {{
   *       [P in keyof Notification]?: string
   *     }}
   */
  propertyMap?: {
    [P in keyof Notification]?: string
  }
}

/**
 * Interface for plugins
 *
 * @export
 * @interface NotificationsPlugin
 */
export interface NotificationsPlugin {
  /**
   * The unique name of the plugin.
   *
   * e.g. 'jsonPlugin'
   *
   * @type {string}
   * @memberof NotificationsPlugin
   */
  name: string
  /**
   * Loads notifications.
   *
   * @returns {Promise<Notification[]>}
   * @memberof NotificationsPlugin
   */
  load(): Promise<Notification[]>
  /**
   * Given an array of notification,
   * return notifications grouped by type.
   *
   * @param {Notification[]} notifications
   * @returns {NotificationsByType}
   * @memberof NotificationsPlugin
   */
  groupByType(notifications: Notification[]): NotificationsByType
  /**
   * Return false to prevent dismission
   *
   * @param {Notification} notification
   * @returns {boolean}
   * @memberof NotificationsPlugin
   */
  beforeDismiss?(notification: Notification): boolean
  /**
   * Called when a notification has been dismissed
   *
   * @param {Notification} notification
   * @memberof NotificationsPlugin
   */
  onDismiss?(notification: Notification): void
  /**
   * Called when a notification has been clicked
   *
   * @param {Notification} notification
   * @memberof NotificationsPlugin
   */
  onClick?(notification: Notification): void
}
