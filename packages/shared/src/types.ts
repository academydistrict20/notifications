export interface Notification {
  id: string
  title: string
  summary: string
  description: string
  startDateTime: string
  endDateTime: string
  categories: string[]
}

export interface NotificationsByType {
  banner?: Notification[]
  floating?: Notification[]
}
