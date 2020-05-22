export default function Client(config) {
  return {
    config: {
      // defaults
      x: 2,
      // Overrides passed in
      ...config,
    },
    notifications: [
      { id: 1, title: 'First Notification', categories: ['Emergency'] },
      { id: 2, title: 'Second Notification', categories: ['Urgent'] },
      { id: 3, title: 'Third Notification', categories: ['Informational'] },
    ],

    dismissedNotificationIds: [],

    getActiveNotifications() {
      return this.notifications.filter((n) => !this.dismissedNotificationIds.includes(n.id))
    },

    getActiveNotificationsByGroup() {
      const activeNotifications = this.getActiveNotifications()
      return {
        banner: activeNotifications.filter((n) => n.categories.includes('Emergency')),
        floating: activeNotifications.filter((n) => n.categories.includes('Urgent')),
        inline: activeNotifications.filter((n) => n.categories.includes('Informational')),
      }
    },

    clearDismissions() {
      this.dismissedNotificationIds = []
      this.callUpdateHandler()
      console.log('dsimiss cleared')
    },

    dismissNotification({ id, title }) {
      if (!id) return
      this.dismissedNotificationIds.push(id)
      console.log(`${title} dismissed`)
      this.callUpdateHandler()
    },

    callUpdateHandler() {
      if (typeof this.config.onUpdate === 'function') {
        console.log('sending new updated data')
        this.config.onUpdate({ activeNotificationsByGroup: this.getActiveNotificationsByGroup() })
      }
    },

    init() {
      this.callUpdateHandler()
    },
  }
}
