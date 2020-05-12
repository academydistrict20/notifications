import { getCookie, setCookie } from '../cookies/index.js'
import { getNotifications } from '../../client/fetch/index.js'

export default {
  props: {
    cookieLabel: {
      type: String,
      default: 'exampleCookie',
    },
  },
  data() {
    return {
      notifications: [],
      dismissedCookies: [],
    }
  },
  async created() {
    try {
      this.notifications = await getNotifications()
      this.getDimissed()
    } catch (err) {
      this.error = `something went wrong ${err}`
    }
  },
  computed: {
    mappedNotifications() {
      return (this.notifications || [])
        .map((m) => {
          let notificationStyle = m.categories.includes('Emergency')
            ? 'Emergency'
            : m.categories.includes('Weather')
            ? 'Urgent'
            : 'Information'
          return {
            ...m,
            notificationStyle: notificationStyle,
          }
        })
        .filter((m) => {
          if (!this.dismissedCookies.includes(m.id)) {
            return m
          }
        })
    },
  },
  methods: {
    dismissNotification(notificationId) {
      this.dismissedCookies.push(notificationId)
      const today = new Date()
      const oneMonth = today.getMonth() + 1
      today.setMonth(oneMonth)
      setCookie(this.cookieLabel, this.dismissedCookies, today)
      this.notifications = this.notifications.filter((m) => m.id != notificationId)
    },
    async getDimissed() {
      this.dismissedCookies = ((await getCookie(this.cookieLabel)) || []).filter((cook) => {
        const notificationIds = this.notifications.map((c) => c.id)
        return notificationIds.includes(cook)
      })
    },
  },
}
