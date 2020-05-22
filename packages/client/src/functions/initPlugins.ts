// import { getCookie, setCookie } from '../../../shared/src/cookieRecipe'
import { NotificationsPlugin } from '@asd20/notifications-shared/src/plugin'
import { defaultStorage } from '@asd20/notifications-shared/src/storage'
import { Notification } from '@asd20/notifications-helpers/src/types'
import { Create } from '@asd20/notifications-plugin-json/'

const defaultConfig = {
  storage: Storage = Object.getPrototypeOf(defaultStorage),
  storageKey: 'defaultStorage',
  plugins: Create(),
}
// config.storage.getItem()

const dismissedNotifications = []
let dismissedCookies: string[] = []
const cookieLabel = 'exampleCookie'

// getNotifications for each plugin
async function getPluginNotifications(plugins: NotificationsPlugin[]): Promise<Notification[]> {
  const allNotifications: any = []
  await plugins.forEach((p: NotificationsPlugin) => allNotifications.push(p.load()))
  return allNotifications.flat()
}
let notifications = getPluginNotifications(defaultConfig.plugins) || []

// Dismissed notification
function dismissNotification(notificationId: string) {
  // adds notificationId to dismissed cookie ids array
  dismissedCookies.push(notificationId)

  // configures cookie settings
  const today = new Date()
  const oneMonth = today.getMonth() + 1
  today.setMonth(oneMonth)

  // sets dismissed cookies
  setCookie(cookieLabel, dismissedCookies, today)

  // removes dismissed cookie from notifications
  notifications = notifications.filter((m: any) => m.id != notificationId)
}

// get dismissed notifications from cookie
async function getDismissedNotifications() {
  // gets dismissed notification ids from cookies and omits those that do not exist in notifications
  dismissedCookies = ((await getCookie(cookieLabel)) || []).filter((cook: any) => {
    const notificationIds = notifications.map((c: any) => c.id)
    return notificationIds.includes(cook)
  })
}

// function init() {
//   console.log('initing')
//   getDismissed()
// }

// init()

export { getPluginNotifications, dismissNotification, getDismissedNotifications, defaultConfig }
