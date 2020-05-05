<template>
  <div>
    <div :class="classes">
      <notification-controls
        class="notification-controls"
        v-if="notifications.length > 0"
        :count="notifications.length"
        @increaseValue="nextNotification()"
        @decreaseValue="previousNotification()"
      />
      <!-- :number="displayedNotificationIndex + 1" -->
      <asd20-notification
        v-for="notification in notifications"
        :key="notification.id"
        :title="notification.title"
        :description="notification.summary"
        :id="notification.id"
        :importance="notification.notificationStyle"
        @dismiss="$emit('dismiss', $event)"
        v-model="currentNotification"
      />
    </div>
  </div>
</template>

<script>
import NotificationControls from '@/components/molecules/NotificationControls'
// import NotificationControlsMixin from '@/mixins/NotificationControlsMixin.js'
import Asd20Notification from '@/components/molecules/Asd20Notification.vue'

export default {
  name: 'NotificationGroup',
  // mixins: [NotificationControlsMixin],
  components: {
    NotificationControls,
    Asd20Notification
  },
  props: {
    notifications: { type: [Array, String], default: () => [] },
    icon: { type: String, default: 'alert' },
    notificationStyles: { type: String, default: 'Banner' }
  },
  data() {
    return {
      notificationStyle: '',
      currentNotification: {}
    }
  },
  computed: {
    notificationIds() {
      return this.notifications.map(n => n.id)
    },
    classes() {
      return {
        'asd20-notification-group': true,
        'asd20-notification-group--banner':
          this.notificationStyles.toLowerCase() === 'banner',
        'asd20-notification-group--floating':
          this.notificationStyles.toLowerCase() === 'floating',
        'asd20-notification-group--inline':
          this.notificationStyles.toLowerCase() === 'inline'
      }
    }
  },
  methods: {
    nextNotification() {}
  }
}
</script>

<style lang="scss">
.asd20-notification-group {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  width: 100%;
  scroll-snap-type: x mandatory;

  .asd20-notification {
    width: 100%;
    flex-shrink: 0;
    scroll-snap-align: start;
    padding-top: 1.6em;
    border: 1px dotted olive;
  }
  .notification-controls {
    position: absolute;
    min-width: max-content;
    z-index: 1000;
    font-size: 10px;
    right: 10px;
    // margin-bottom: 10px;
  }
}
</style>
