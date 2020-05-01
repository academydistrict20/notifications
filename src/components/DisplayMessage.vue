<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <div v-else data-testid="notifications">
      <NotificationGroupOfGroups
        style="Banner"
        :notificationGroups="mappedNotificationGroups"
        @dismiss="dismissNotification($event)"
      />
      <dismissed-notifications :dismissed="dismissedCookies.length" />
    </div>
  </div>
</template>

<script>
import { getNotification } from '@/services/axios.js'
import NotificationGroupOfGroups from '@/components/organisms/NotificationGroupOfGroups'
import DismissedNotifications from '@/components/organisms/DismissedNotifications'
import { setCookie, getCookie } from '@/services/cookieRecipe.js'

export default {
  name: 'DisplayNotification',
  props: {
    cookieLabel: {
      type: String,
      default: 'exampleCookie'
    }
  },
  components: {
    NotificationGroupOfGroups,
    DismissedNotifications
  },
  data() {
    return {
      notifications: null,
      error: null,
      dismissedCookies: []
    }
  },
  async created() {
    try {
      this.notifications = await getNotification(['SPED', 'Outage'])
      // this.dismissedCookies = (await getCookie(this.cookieLabel)) || []
      this.getDimissed()
    } catch (err) {
      this.error = `something went wrong ${err}`
    }
  },
  computed: {
    mappedNotifications() {
      return (this.notifications || [])
        .map(m => {
          let notificationStyle = m.categories.includes('Emergency')
            ? 'Emergency'
            : m.categories.includes('Weather')
            ? 'Urgent'
            : 'Information'
          return {
            ...m,
            notificationStyle: notificationStyle
          }
        })
        .filter(m => {
          if (!this.dismissedCookies.includes(m.id)) {
            return m
          }
        })
    },
    mappedNotificationGroups() {
      let notificationStyles = this.mappedNotifications.reduce(
        (a, c) =>
          a.includes(c.notificationStyle) ? a : [...a, c.notificationStyle],
        []
      )
      let notificationsByGroupStyleCategory = []
      for (let key of notificationStyles) {
        notificationsByGroupStyleCategory.push({
          type: key,
          notifications: this.mappedNotifications.filter(
            m => m.notificationStyle === key
          )
        })
      }
      return notificationsByGroupStyleCategory
    }
  },
  methods: {
    dismissNotification(notificationId) {
      this.dismissedCookies.push(notificationId)
      const today = new Date()
      const oneMonth = today.getMonth() + 1
      today.setMonth(oneMonth)

      setCookie(this.cookieLabel, this.dismissedCookies, today)
      this.notifications = this.notifications.filter(
        m => m.id != notificationId
      )
    },
    async getDimissed() {
      this.dismissedCookies =
        ((await getCookie(this.cookieLabel)) || []).filter(cook => {
          const notificationIds = this.notifications.map(c => c.id)
          // console.log('messgaes', notificationIds)
          return notificationIds.includes(cook)
        }) || []
    }
  }
}
</script>

<style lang="scss" scoped></style>
