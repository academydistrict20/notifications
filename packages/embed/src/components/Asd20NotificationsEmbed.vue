<template>
  <div :id="`asd20-embed`">
    <pre>{{computedGroups}}</pre>
    <!-- <MountingPortal
      v-for="group in computedGroups"
      :key="group.type"
      :mountTo="group.selector"
      append
    > -->
      <!-- NotificaitonGroup -->
      <!-- <asd20-notification-group></asd20-notification-group> -->
      <Asd20NotificationGroup></Asd20NotificationGroup>
      <!-- <Asd20NotificationGroup 
        :notifications="computedGroups[0].notifications"
        :type="computedGroups[0].type"
        @dismiss="onDismiss"
      ></Asd20NotificationGroup> -->
    <!-- </MountingPortal> -->
    <button @click="clear">Clear Dismissions</button>
  </div>
</template>

<script>
// Client & Plugins
import NotificationClient from '@asd20/notifications-client'
// import JsonPlugin from '@asd20/notifications-plugin-json'
// import { Create as CcMessagesPlugin } from '@asd20/notifications-plugin-cc-messages'

// Components
import { MountingPortal } from 'portal-vue'
import { Asd20NotificationGroup } from '@asd20/notifications-ui'

export default {
  name: 'Asd20NotificationsEmbed',

  components: {
    MountingPortal,
    Asd20NotificationGroup,
  },

  props: {
    // declare props for config
    config: {
      type: Object,
      // TODO: Update with default configuration
      default: () => ({})
    },
    groups: {
      // add dom insertion querySelector props
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
    // Store a reference to the client instance
    client: null,
    // Where we will reactively keep track
    // of notifiction data sent from client
    activeNotificationsByType: {
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
          notifications: this.activeNotificationsByType[key]
        })
      }
      return outputGroups
    }
  },

  mounted() {
    // Create a new client instance
    // Pass config, groups, and update callback
    this.client = new NotificationClient(
      // Pass in config object
      {
        // First, include any config from the embed component props
        ...this.config,
        // Ask the client to call a function
        // whenever notifications data changes
        // so that the we can update the UI reactively
        onUpdate: this.onUpdate
      })
  },

  methods: {
    // Asks the client to dismiss a notification
    onDismiss(notification) {
      if (!this.client) return
      this.client.dismiss(notification)
    },
    // Responds to the client updating the notifications
    // e.g. After new notificaitons are loaded, or dismissed
    onUpdate({ activeNotificationsByType }) {
      this.activeNotificationsByType = activeNotificationsByType
    },
    // Asks the client to undismiss all notifications
    clear() {
      if (!this.client) return
      this.client.clearDismissions()
    }
  }
}
</script>
