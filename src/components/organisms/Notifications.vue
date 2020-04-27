<template>
  <!-- Think about how to possibly save dismissed notifications, perhaps use a cookie so the domain can communicate with this component. -->
  <div>
    <div class="asd20-notification-batch" :class="classes">
      <notification-controls
        v-if="messages.length > 0"
        :count="messages.length"
        :number="displayedMessageIndex + 1"
        @increaseValue="nextMessage()"
        @decreaseValue="previousMessage()"
      />
      <div v-if="messages" role="alert" class="asd20-notification-container">
        <div class="heading">
          <asd20-icon v-if="icon" :name="icon" size="lg" />
        </div>
        <div class="body">
          <h4>{{ messages[displayedMessageIndex].title }}</h4>
          <p>{{ messages[displayedMessageIndex].summary }}</p>
        </div>
        <asd20-button
          transparent
          size="sm"
          icon="close"
          label="Dismiss"
          hide-label
          @click.native="$emit('dismiss', messages[displayedMessageIndex].id)"
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
  name: 'Notifications',
  mixins: [NotificationControlsMixin],
  components: { NotificationControls, Asd20Button, Asd20Icon },
  props: {
    messages: { type: Array, default: () => [] },
    icon: { type: String, default: 'alert' }
  },
  data() {
    return {
      notificationStyle: ''
    }
  },
  computed: {
    classes() {
      let classes = {}
      for (const m of this.messages) {
        if (m.notificationStyle) {
          classes = {
            'asd20-notification': true,
            'asd20-notification--banner':
              m.notificationStyle.toLowerCase() === 'emergency',
            'asd20-notification--floating':
              m.notificationStyle.toLowerCase() === 'floating',
            'asd20-notification--inline':
              m.notificationStyle.toLowerCase() === 'information',
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
  max-width: 90%;
  .asd20-icon {
    margin: 1em;
  }
  .body {
    display: flex;
    flex-direction: column;
    margin-left: 0.5em;
    h4 {
      margin-bottom: 0.5em;
    }
    p {
      margin: 0 0 1em 0;
    }
  }

  .asd20-button {
    position: absolute;
    right: 0;
    top: 1em;
    background: inherit;
    .asd20-icon:hover {
      background: rgba(255, 255, 255, 0.5)
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
    padding-right: 0.5em;
    right: 0;
    bottom: 0;
    color: initial;
  }
}
.asd20-notification--floating {
  background: orange;
}

</style>
