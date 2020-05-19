<template>
  <div :id="`asd20-embed`">
    <MountingPortal
      v-for="(group, type) of computedGroups"
      :key="type"
      :mountTo="group.selector"
      append
    >

      <div style="border: 2px dashed green; padding: 1rem;">
        From Instance Id: {{ _uid }}<br />
        <pre>{{ group.selector }}</pre>

        <div v-for="notification of group.notifications" :key="notification.id">
          {{notification.title}}
          <button @click="onDismiss(notification)">Dismiss</button>
        </div>
      </div>
    </MountingPortal>
    <button @click="clear">Clear Dismissions</button>
  </div>
</template>

<script>
import { MountingPortal } from 'portal-vue'

// TODO: Use real client
const Client = (config) => ({
  config,
  notifications: [
    { id: 1, title: 'First Notification', categories: ['Emergency'] },
    { id: 2, title: 'Second Notification', categories: ['Urgent'] },
    { id: 3, title: 'Third Notification', categories: ['Informational'] },
  ],
  dismissedNotificationIds: [],
  getActiveNotifications() {
    return this.notifications.filter(n => !this.dismissedNotificationIds.includes(n.id))
  },
  getActiveNotificationsByGroup() {
    const activeNotifications = this.getActiveNotifications()
    return {
      banner: activeNotifications.filter(n => n.categories.includes('Emergency')),
      floating: activeNotifications.filter(n => n.categories.includes('Urgent')),
      inline: activeNotifications.filter(n => n.categories.includes('Informational')),
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
      this.config.onUpdate({ activeNotificationsByGroup: this.getActiveNotificationsByGroup() })
    }
  },
  init() {
    this.callUpdateHandler()
  }
})

export default {
  name: 'Asd20NotificationsEmbed',

  components: {
    MountingPortal
  },

  props: {
    config: {
      type: Object,
      // TODO: Update with default configuration
      default: () => ({})
    },
    groups: {
      type: Object,
      default: () => ({}),
      // Make sure the groups pass validation
      validator: function (value) {
        // Must be an object
        if (typeof value !== 'object') return 'not an object'
        // Must have at least one key
        if (Object.keys(value).length === 0) return 'no keys present'
        // Must only have valid keys
        if (Object.keys(value).filter(key => !['banner', 'inline', 'floating', 'status'].includes(key)).length > -1) return 'invalid keys'
        return true
      }
    }
  },

  data: () => ({
    // Store a reference to the client instanec
    client: null,
    // Where we will reactively keep track
    // of notifiction data sent from client
    activeNotificationsByGroup: {
      banner: [],
      inline: [],
      floating: [],
      status: []
    }
  }),

  computed: {
    // Combine notification data
    // with group mounting info
    computedGroups() {
      let outputGroups = []
      for(const key in this.groups) {
        outputGroups.push({
          type: key,
          selector: this.groups[key].selector,
          notifications: this.activeNotificationsByGroup[key]
        })
      }
      return outputGroups
    }
  },

  mounted() {
    // Create a new client instance
    // Pass config, groups, and update callback
    this.client = Client({ ...this.config, groups: this.groups, onUpdate: this.onUpdate })
    // Innitialize the client
    this.client.init()
  },

  methods: {
    // Asks the client to dismiss a notification
    onDismiss(notification) {
      if (!this.client) return
      this.client.dismissNotification(notification)
    },
    // Responds to the client updating the notifications
    // e.g. After new notificaitons are loaded, or dismissed
    onUpdate({ activeNotificationsByGroup }) {
      this.activeNotificationsByGroup = activeNotificationsByGroup
    },
    // Asks the client to undismiss all notifications
    clear() {
      if (!this.client) return
      this.client.clearDismissions()
    }
  }
}
</script>
