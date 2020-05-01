<template>
  <div>
    <div class="asd20-notification-batch" :class="classes">
      <notification-controls
        v-if="notifications.length > 0"
        :count="notifications.length"
        :number="displayedNotificationIndex + 1"
        @increaseValue="nextNotification()"
        @decreaseValue="previousNotification()"
      />
      <div
        v-if="notifications.length > 0"
        role="alert"
        class="asd20-notification-container"
      >
        <div class="heading">
          <asd20-icon v-if="icon" :name="icon" size="lg" />
        </div>
        <div class="body">
          <h4>
            {{ notifications[displayedNotificationIndex].title }}
          </h4>
          <p>
            {{ notifications[displayedNotificationIndex].summary }}
          </p>
        </div>
        <asd20-button
          transparent
          size="sm"
          icon="close"
          label="Dismiss"
          hide-label
          @click.native="
            $emit('dismiss', notifications[displayedNotificationIndex].id)
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import NotificationControls from '@/components/molecules/NotificationControls'
import Asd20Button from '@/components/molecules/Asd20Button'
import NotificationControlsMixin from '@/mixins/NotificationControlsMixin.js'
import Asd20Icon from '@/components/atoms/Asd20Icon'

export default {
  name: 'NotificationGroup',
  mixins: [NotificationControlsMixin],
  components: { NotificationControls, Asd20Button, Asd20Icon },
  props: {
    notifications: { type: [Array, String], default: () => [] },
    icon: { type: String, default: 'alert' },
    notificationStyles: { type: String, default: 'Banner' }
  },
  data() {
    return {
      notificationStyle: ''
    }
  },
  computed: {
    classes() {
      // let classes = {}
      // for (const m of this.notifications) {
      //   if (m.notificationStyle) {
      //     classes = {
      //       'asd20-notification': true,
      //       'asd20-notification--banner':
      //         m.notificationStyle.toLowerCase() === 'banner',
      //       'asd20-notification--floating':
      //         m.notificationStyle.toLowerCase() === 'floating',
      //       'asd20-notification--inline':
      //         m.notificationStyle.toLowerCase() === 'inline',
      //       'asd20-notification--urgent':
      //         m.notificationStyle.toLowerCase() === 'urgent'
      //     }
      //   }
      // }

      return {
        'asd20-notification': true,
        'asd20-notification--banner':
          this.notificationStyles.toLowerCase() === 'banner',
        'asd20-notification--floating':
          this.notificationStyles.toLowerCase() === 'floating',
        'asd20-notification--inline':
          this.notificationStyles.toLowerCase() === 'inline',
        'asd20-notification--urgent':
          this.notificationStyles.toLowerCase() === 'urgent'
      }
    }
  }
}
</script>

<style lang="scss">
.asd20-notification-batch {
  display: flex;
  flex-direction: row;
  // align-items: center;
}
.asd20-notification-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 85%;
  .heading .asd20-icon {
    margin: 1em 0.5em;
  }
  .body {
    display: flex;
    flex-direction: column;
    margin: 0 0 2em 0.5em;
    h4 {
      margin-bottom: 0.5em;
    }
    p {
      margin: 0 0 0.5em 0;
    }
  }

  .asd20-button {
    position: absolute;
    right: 0;
    top: 1em;
    background: inherit;
    .asd20-icon:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
}
.asd20-notification {
  position: relative;
  width: 100%;
  min-height: 7em;
  &--inline {
    background: cadetblue;
    color: #ffffff;
    .heading {
      .asd20-icon g {
        color: #ffffff;
      }
    }
  }
  &--banner {
    background: red;
    color: #ffffff;
    .heading {
      .asd20-icon g {
        color: #ffffff;
      }
    }
  }
  &--urgent {
    background: #dabe35;
    color: #ffffff;
    .heading {
      .asd20-icon g {
        color: #ffffff;
      }
    }
  }
  .notification-controls {
    position: absolute;
    right: 0;
    bottom: 0;
    color: initial;
  }
}
.asd20-notification--floating {
  background: orange;
}

@media (min-width: 1024px) {
  .asd20-notification-container {
    .heading .asd20-icon {
      margin: 1em;
    }
    .asd20-button {
      right: 0.5em;
    }
  }
}
</style>
