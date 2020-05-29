import { NotificationsPlugin } from './plugin'

export interface Notification {
  id: string
  title: string
  summary: string
  description: string
  startDateTime: string
  endDateTime: string
  categories: string[]
}

export function notificationFactory(source: Partial<Notification>): Notification {
  return {
    id: source.id || `${new Date().getTime()}`,
    title: source.title || '',
    summary: source.summary || '',
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
