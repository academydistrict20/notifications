import { NotificationsPlugin } from './plugin'

export const enum NotificationImportance {
  INFO = 'info',
  ALERT = 'alert',
  EMERGENCY = 'emergency',
  SUCCESS = 'success',
}

export const enum NotificationTypes {
  BANNER = 'banner',
  FLOATING = 'floating',
  INLINE = 'inline',
  STATUS = 'status',
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
  importance?: string | NotificationImportance
  type?: NotificationTypes
}

export function notificationFactory(source: Partial<Notification>): Notification {
  return {
    id: source.id || `${new Date().getTime()}`,
    title: source.title || '',
    description: source.description || '',
    startDateTime: source.startDateTime || new Date().toISOString(),
    endDateTime: source.endDateTime || new Date().toISOString(),
    categories: source.categories || [],
    icon: source.icon || '',
    callToActionUrl: source.callToActionUrl || '',
    callToActionLabel: source.callToActionLabel || '',
    dismissible: source.dismissible || true,
    color: source.color || '',
    detailLinkUrl: source.detailLinkUrl || '',
    detailLinkLabel: source.detailLinkLabel || '',
    importance: source.importance || NotificationImportance.INFO,
    type: source.type || NotificationTypes.FLOATING,
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
