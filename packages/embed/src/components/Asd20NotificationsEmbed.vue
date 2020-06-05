<template>
  <div :id="`asd20-notifications-embed`" v-if="nextTick">
    <mounting-portal
      v-for="(group, type) of groups"
      :key="type"
      :mountTo="group.selector"
      append
    >
      <Asd20NotificationGroup 
        :notifications="activeNotificationsByType[type]"
        :type="type"
        @dismiss="onDismiss"
      ></Asd20NotificationGroup>
    </mounting-portal>
  </div>
</template>

<script>
// Client
import NotificationClient from '@asd20/notifications-client'

// Components
import { MountingPortal } from 'portal-vue'
import Asd20NotificationGroup from '@asd20/notifications-ui/src/components/Asd20NotificationGroup.vue'
// import Asd20NotificationGroup from '../../../ui/src/components/Asd20NotificationGroup.vue'

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
    },

    nextTick: false
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
    // We need to wait until next tick to make sure that
    // all dom elements are mounted before VuePortal attempts to mount
    this.$nextTick(() => {
      // This will allow the component to render
      // Basically deferring until it's surrounding elements are mounted
      this.nextTick = true
    })

    this.initializeClient()
  },

  watch: {
    config: function(val) {
      this.initializeClient()
    }
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
      console.log('update called', activeNotificationsByType)
      this.activeNotificationsByType = activeNotificationsByType
    },
    // Asks the client to undismiss all notifications
    clear() {
      if (!this.client) return
      this.client.clearDismissions()
    },

    initializeClient() {
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
    }
  }
}
</script>
