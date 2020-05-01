export default {
  data() {
    return {
      displayedNotificationIndex: 0
    }
  },
  methods: {
    nextNotification() {
      if (this.displayedNotificationIndex < this.notifications.length - 1) {
        this.displayedNotificationIndex += 1
      }
    },
    previousNotification() {
      if (this.displayedNotificationIndex >= 1) {
        this.displayedNotificationIndex -= 1
      }
    }
  }
}
