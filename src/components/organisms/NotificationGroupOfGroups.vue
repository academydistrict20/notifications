<template>
  <div>
    <notification-group
      :class="classes"
      v-for="(notificationGroup, index) in filteredNotifications"
      :key="index"
      :notifications="notificationGroup.notifications"
      @dismiss="$emit('dismiss', $event)"
    >
      <slot />
    </notification-group>
  </div>
</template>

<script>
import NotificationGroup from '@/components/organisms/NotificationGroup'

export default {
  name: 'NotificationGroupOfGroups',
  components: { NotificationGroup },
  props: {
    notificationGroups: { type: Array, default: () => [] },
    style: { type: [String, Array] }
  },
  computed: {
    filteredNotifications() {
      let isArray = Array.isArray(this.style)
      return isArray
        ? this.notificationGroups.filter(m => {
            let found = ''
            for (let t of this.type) {
              if (m.type === t) {
                found = t
              }
            }
            return m.style === found
          })
        : this.notificationGroups.filter(m => m.style === this.style)
    },
    classes() {
      let classes = {}
      for (const m of this.notificationGroups) {
        if (m.notificationStyle) {
          classes = {
            'asd20-notification-group': true,
            'asd20-notification--banner':
              m.notificationStyle.toLowerCase() === 'banner',
            'asd20-notification--floating':
              m.notificationStyle.toLowerCase() === 'floating',
            'asd20-notification--inline':
              m.notificationStyle.toLowerCase() === 'inline',
            'asd20-notification--urgent':
              m.notificationStyle.toLowerCase() === 'urgent'
          }
        }
      }
      return classes
    }
  }
}
</script>

<style lang="scss" scoped>
.informational-notification {
  background: cadetblue;
}
</style>
