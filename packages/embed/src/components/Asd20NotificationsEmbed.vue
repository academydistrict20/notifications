<script>
// Client
import NotificationClient from '@asd20/notifications-client'

// Components
import { MountingPortal } from 'portal-vue'

export default {
  render(h) {
    const mountingPortalNodes = []

    for (const [type, group] of Object.entries(this.groups)) {
      mountingPortalNodes.push(h(
        'mounting-portal',
        {
          props: {
            key: type,
            mountTo: this.groupTargetSelectors[type],
            append: true
          }
        },
        [
          h(
            'asd20-notification-group',
            {
              domProps: {
                notifications: this.activeNotificationsByType[type],
                totalDismissedNotifications: this.dismissedNotifications.length
              },
              attrs: {
                'group-type': type, 
                position: group.position
              },
              on: {
                dismiss: this.onDismiss,
                'toggle-all': this.onToggleAll
              }
            }
          )
        ]
      ))
    }

    if (this.nextTick) {
      return h(
        'div', // Tag name
        {      // Options
          attrs: {
            id: 'asd20-notifications-embed'
          }
        },
        mountingPortalNodes
      )
    }
  },

  name: 'asd20-notifications-embed',

  components: {
    MountingPortal
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
      default: () => ({
        banner: {
          selector: 'body',
          prepend: true
        },
        floating: {
          selector: 'body',
          prepend: true,
          position: 'bottom-right'
        },
      }),
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

    dismissedNotifications: [],

    groupTargetSelectors: {},

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
          selector: this.groupTargetSelectors[key],
          notifications: this.activeNotificationsByType[key],
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
    },
    groups: {
      handler: function(val) {
        this.updateGroupTargetElements()
      },
      immediate: true
    },
  },

  methods: {
    // Asks the client to dismiss a notification
    onDismiss(event) {
      const notification = event.detail[0]
      if (!this.client) return
      this.client.dismiss(notification)
    },

    // Asks the client to dismiss a notification
    onToggleAll() {
      if (!this.client) return
      if (this.dismissedNotifications.length > 0) {
        this.client.clearDismissions()
      } else {
        this.client.dismissFloating()
      }
    },
    // Responds to the client updating the notifications
    // e.g. After new notificaitons are loaded, or dismissed
    onUpdate({ activeNotificationsByType, dismissedNotifications }) {
      this.activeNotificationsByType = activeNotificationsByType
      this.dismissedNotifications = dismissedNotifications
    },
    // Asks the client to undismiss all notifications
    clear() {
      if (!this.client) return
      this.client.clearDismissions()
    },

    updateGroupTargetElements() {
      this.groupTargetSelectors = {}

      for (const groupKey in this.groups) {
        let targetEl = null
        let selector = this.groups[groupKey].selector
        const containerEl = document.querySelector(selector)
        if (containerEl) {
          // The user wants this group prepended instead of appended
          if (this.groups[groupKey].prepend) {
            // Try to find existing top-level target elenent
            targetEl = containerEl.querySelector('.asd20-embed-container-top')
            // If not found, insert one
            if (!targetEl) {
              // Create an empty div
              targetEl = document.createElement('div')
              targetEl.className = 'asd20-embed-container-top'
              // Add new div to top of container
              containerEl.prepend(targetEl)
            }
            // Set the selector to the new value
            selector = `${selector} .asd20-embed-container-top`
          } else {
            targetEl = containerEl
          }

          // Add resolved targetEl selector
          this.groupTargetSelectors[groupKey] = selector
        }
      }
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
