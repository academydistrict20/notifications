<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <div v-else data-testid="notifications">
      <portal
        :key="index"
        v-for="(notifications, index) in filterEmbedLocations"
        :selector="notifications.el"
      >
        <notification-group
          @dismiss="dismissNotification"
          :notificationStyles="style"
          :notifications="notifications.notifications"
        />
      </portal>
      <dismissed-notifications
        v-if="dismissedCookies.length > 0"
        :dismissed="dismissedCookies.length"
      />
    </div>
  </div>
</template>

<script>
import { getNotification } from '@/services/axios.js'
import DismissedNotifications from '@/components/organisms/DismissedNotifications'
import NotificationGroup from '@/components/organisms/NotificationGroup'
import { setCookie, getCookie } from '@/services/cookieRecipe.js'
import { Portal } from '@linusborg/vue-simple-portal'

export default {
  name: 'NotificationComponent',
  props: {
    categories: {
      type: Array
    },
    locations: {
      type: String
    },
    apiEndpoint: {
      type: String
    },
    embedLocations: {
      type: [Array, String],
      default: () => []
    },
    notificationsGroups: {
      type: Array,
      default: () => []
    }
  },
  components: {
    NotificationGroup,
    DismissedNotifications,
    Portal
  },
  data() {
    return {
      notifications: null,
      error: null,
      dismissedCookies: []
    }
  },
  created() {
    this.fetchNotifications()
    // this.mountComponent()
  },

  // watch: {
  // notifications(newValue, oldValue) {
  //   if (newValue !== oldValue) {
  //     this.mountComponent()
  //   }
  // }
  // },
  computed: {
    mappednotifications() {
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
    mappedInformationalNotifications() {
      return this.mappednotifications.filter(
        m => m.notificationStyle === 'Information'
      )
    },
    mappedEmergencyNotifications() {
      return this.mappednotifications.filter(
        m => m.notificationStyle === 'Emergency'
      )
    },
    mappedUrgentNotifications() {
      return this.mappednotifications.filter(
        m => m.notificationStyle === 'Urgent'
      )
    },
    filterEmbedLocations() {
      return this.embedLocations.map(c => ({
        ...c,
        notifications: c.notifications.filter(
          n => !this.dismissedCookies.includes(n.id)
        )
      }))
    }
    // mappedNotificationGroups() {
    //   let notificationStyles = this.mappednotifications.reduce(
    //     (a, c) =>
    //       a.includes(c.notificationStyle) ? a : [...a, c.notificationStyle],
    //     []
    //   )
    //   let messagesByCategory = []
    //   for (let key of notificationStyles) {
    //     messagesByCategory.push({
    //       type: key,
    //       messages: this.mappedNotifications.filter(
    //         m => m.notificationStyle === key
    //       )
    //     })
    //   }
    //   return messagesByCategory
    // }
  },
  methods: {
    mountComponent() {
      for (let n of this.embedLocations) {
        const location = document.querySelector(n.el)
        let notificationComponent = document.createElement(
          'asd20-notification-group'
        )
        notificationComponent.setAttribute('notification-styles', n.style)
        location.appendChild(notificationComponent)
        notificationComponent.notifications = n.notifications
        console.log('notification component', location)
      }
    },
    dismissNotification(messageId) {
      this.dismissedCookies.push(messageId)
      const today = new Date()
      const oneMonth = today.getMonth() + 1
      today.setMonth(oneMonth)

      setCookie('notification-component', this.dismissedCookies, today)
      // if (this.embedLocations) {
      //   this.embedLocaions.filter(n => n.id !== messageId)
      // }
      this.notifications = this.notifications.filter(m => m.id != messageId)
    },
    async getDimissed() {
      this.dismissedCookies =
        ((await getCookie('notification-component')) || []).filter(cook => {
          const notificationIds = this.notifications.map(c => c.id)
          // console.log('messgaes', notificationIds)
          return notificationIds.includes(cook)
        }) || []
    },
    async fetchNotifications() {
      try {
        this.notifications = await getNotification(
          this.categories ? this.categories.split(',') : '',
          this.locations ? this.locations.split(',') : '',
          this.ApiEndpoint
        )
        this.getDimissed()
      } catch (err) {
        this.error = `something went wrong ${err}`
      }
      // this.$emit('loaded', [
      //   {
      //     type: 'Emergency',
      //     notifications: this.mappedEmergencyNotifications
      //   },
      //   {
      //     type: 'Informational',
      //     notifications: this.mappedInformationalNotifications
      //   },
      //   { type: 'Urgent', notifications: this.mappedUrgentNotifications }
      // ])
      this.fireEvent()
    },
    fireEvent() {
      this.$emit('loaded', [
        {
          type: 'Emergency',
          notifications: this.mappedEmergencyNotifications
        },
        {
          type: 'Informational',
          notifications: this.mappedInformationalNotifications
        },
        { type: 'Urgent', notifications: this.mappedUrgentNotifications }
      ])
    },
    async bubbleNotifications() {
      await this.notifications
      console.log('bubbled')
      this.$emit('loaded', [
        {
          nType: 'Emergency',
          notifications: this.mappedEmergencyNotifications
        },
        {
          nType: 'Informational',
          notifications: this.mappedInformationalNotifications
        },
        { nType: 'Urgent', notifications: this.mappedUrgentNotifications }
      ])
    }
  }
}
</script>
