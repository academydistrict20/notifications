<template>
  <div>
    <notifications
      class="notification-group"
      v-for="(messageGroup, index) in filteredMessages"
      :key="index"
      :messages="messageGroup.messages"
      @dismiss="$emit('dismiss', $event)"
    >
      <slot />
    </notifications>
  </div>
</template>

<script>
import Notifications from '@/components/organisms/Notifications'

export default {
  name: 'NotificationGroup',
  components: { Notifications },
  props: {
    messageGroups: { type: Array, default: () => [] },
    type: { type: [String, Array] }
  },
  computed: {
    filteredMessages() {
      let isArray = Array.isArray(this.type)
      return isArray
        ? this.messageGroups.filter(m => {
            let found = ''
            for (let t of this.type) {
              if (m.type === t) {
                found = t
              }
            }
            return m.type === found
          })
        : this.messageGroups.filter(m => m.type === this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
.informational-notification {
  background: cadetblue;
}
</style>
