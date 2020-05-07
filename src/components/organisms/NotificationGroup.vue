<template>
  <div :class="classes">
    <!-- how can I know the current visible notification so I can navigate to the next or previous. Should I be looking at something like Intersection Observer API?  -->
    <notification-controls
      class="notification-controls"
      v-if="notifications.length > 0"
      :count="notifications.length"
      @increaseValue="nextNotification()"
      @decreaseValue="previousNotification()"
    />
    <!-- :number="displayedNotificationIndex + 1" -->

    <asd20-notification
      class="observer-window"
      v-for="notification of notificationsFromIndex"
      :key="notification.id"
      :title="notification.title"
      :description="notification.summary"
      :id="notification.id"
      :importance="notification.notificationStyle"
      @dismiss="$emit('dismiss', $event)"
      @found="setVisible($event)"
    />
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
      // observer: null,
      // isObserved: false,
      // currentNotification: null,
      notificationsFromIndex: [],
      index: 0,
      enterActiveClass: 'stack-in',
      leaveActiveClass: 'stack-out'
    }
  },
  // mounted() {
  //   this.observer = new IntersectionObserver(entries =>
  //     entries.forEach(e => {
  //       if (e.isIntersecting) {
  //         this.isObserved = true
  //         console.log(e)
  //       }
  //     })
  //   )
  //   let el = document.querySelector('.observer-window')
  //   this.observer.observe(el)
  // this.observer.observe(this.$el)
  // },
  created() {
    this.initNotifications()
  },
  watch: {
    notifications: function(value) {
      this.initNotifications(value)
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
    initNotifications(value) {
      this.notificationsFromIndex = (value || []).map(n => ({
        ...n,
        key: Math.random()
          .toString(36)
          .substr(2, 9)
      }))
    },
    // setVisible(id) {
    //   let found = this.notifications.find(n => n.id === id)
    //   this.currentNotification = found
    // },
    nextNotification() {
      const newIndex =
        this.index < this.notifications.length - 1 ? this.index + 1 : 0
      const topItem = this.notificationsFromIndex[0]

      topItem.key = Math.random()
        .toString(36)
        .substr(2, 9)

      this.enterActiveClass = ''
      this.leaveActiveClass = 'stack-out'

      // remove top item
      this.notificationsFromIndex.splice(0, 1)

      // Update the Index
      this.index = newIndex
    }
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
