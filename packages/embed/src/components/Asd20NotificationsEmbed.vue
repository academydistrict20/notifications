<template>
  <div :id="`asd20-embed`">
    <MountingPortal
      v-for="(group, type) of computedGroups"
      :key="type"
      :mountTo="group.selector"
      append
    >
      <!-- NotificaitonGroup -->
      <div style="border: 2px dashed green; padding: 1rem;">
        From Instance Id: {{ _uid }}<br />
        <pre>{{ group.selector }}</pre>
        <!-- Notifications -->
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
import client from '../fakeClient'

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
    this.client = Client(
      // Pass in config object
      {
        // First, include any config from the embed component props
        ...this.config,
        // Pass groups seperately
        groups: this.groups,
        // Ask the client to call a function
        // whenever notifications data changes
        // so that the we can update the UI reactively
        onUpdate: this.onUpdate
      })
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
