<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <div v-else data-testid="messages">
      <NotificationGroup
        :type="notificationStyles"
        :messageGroups="mappedMessageGroups"
        @dismiss="dismissMessage($event)"
      />
      <dismissed-notifications :dismissed="dismissedCookies.length" />
    </div>
  </div>
</template>

<script>
import { getMessage } from '@/services/axios.js'
import NotificationGroup from '@/components/organisms/NotificationGroup'
import DismissedNotifications from '@/components/molecules/DismissedNotifications'
import { setCookie, getCookie } from '@/services/cookieRecipe.js'

export default {
  name: 'DisplayMessage',
  props: {
    categories: {
      type: [Array, String]
    },
    locations: {
      type: Array
    },
    apiEndpoint: {
      type: String
    },
    notificationStyles: {
      type: [Array, String],
      default: () => ['Information', 'Emergency', 'Urgent']
    }
  },
  components: {
    NotificationGroup,
    DismissedNotifications
  },
  data() {
    return {
      messages: null,
      error: null,
      dismissedCookies: []
    }
  },
  async created() {
    try {
      this.messages = await getMessage(
        this.categories,
        this.locations,
        this.ApiEndpoint
      )
      this.getDimissed()
    } catch (err) {
      this.error = `something went wrong ${err}`
    }
  },
  computed: {
    mappedMessages() {
      return (this.messages || [])
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
    mappedMessageGroups() {
      let notificationStyles = this.mappedMessages.reduce(
        (a, c) =>
          a.includes(c.notificationStyle) ? a : [...a, c.notificationStyle],
        []
      )
      let messagesByCategory = []
      for (let key of notificationStyles) {
        messagesByCategory.push({
          type: key,
          messages: this.mappedMessages.filter(m => m.notificationStyle === key)
        })
      }
      return messagesByCategory
    }
  },
  methods: {
    dismissMessage(messageId) {
      this.dismissedCookies.push(messageId)
      const today = new Date()
      const oneMonth = today.getMonth() + 1
      today.setMonth(oneMonth)

      setCookie('notification-component', this.dismissedCookies, today)
      this.messages = this.messages.filter(m => m.id != messageId)
    },
    async getDimissed() {
      this.dismissedCookies =
        ((await getCookie('notification-component')) || []).filter(cook => {
          const messageIds = this.messages.map(c => c.id)
          // console.log('messgaes', messageIds)
          return messageIds.includes(cook)
        }) || []
    }
  }
}
</script>

<style lang="scss" scoped></style>
