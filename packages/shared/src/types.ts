import { NotificationsPlugin } from './plugin'

export const enum NotificationIimportance {
  INFO = 'info',
  ALERT = 'alert',
  EMERGENCY = 'emergency',
  SUCCESS = 'success',
}

export interface Notification {
  id: string
  title: string
  description: string
  startDateTime: string
  endDateTime: string
  categories: string[]
  icon?: string
  callToActionUrl?: string
  callToActionLabel?: string
  dismissible?: boolean
  color?: string
  detailLinkUrl?: string
  detailLinkLabel?: string
  importance?: string | NotificationIimportance
}

export function notificationFactory(source: Partial<Notification>): Notification {
  return {
    id: source.id || `${new Date().getTime()}`,
    title: source.title || '',
    description: source.description || '',
    startDateTime: source.startDateTime || new Date().toISOString(),
    endDateTime: source.endDateTime || new Date().toISOString(),
    categories: source.categories || [],
  }
}

export interface NotificationsByType {
  banner?: Notification[]
  floating?: Notification[]
  inline?: Notification[]
  status?: Notification[]
}

export interface NotificationsClient {
  config: {
    storageKey: string
    storage?: Storage
    plugins?: NotificationsPlugin[]
  }
}
