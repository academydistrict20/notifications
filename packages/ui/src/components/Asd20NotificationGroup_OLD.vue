<template>
  <div :class="classes" role="region" v-if="notifications">
    <transition-group name="notification-group-animation">
      <asd20-notification
        v-for="notification in computedNotifications"
        :key="notification.id"
        v-bind="notification"
        @dismiss="$emit('dismiss', notification)"
      ></asd20-notification>
      <slot></slot>
    </transition-group>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
import Asd20Notification from './Asd20Notification.vue'

export default {
  name: 'Asd20NotificationGroup',

  components: { Asd20Notification },

  props: {
    notifications: { type: Array, default: () => [] },
    type: { type: String, default: 'inline' },
  },

  computed: {
    classes() {
      return {
        'asd20-notification-group': true,
        'asd20-notification-group--inline': this.type === 'inline',
        'asd20-notification-group--floating': this.type === 'floating',
        'asd20-notification-group--banner': this.type === 'banner',
        'asd20-notification-group--sticky': this.type === 'sticky',
        'asd20-notification-group--status': this.type === 'status',
      }
    },
    computedNotifications() {
      let notifications = this.notifications
        .map(n => ({
          id: n.id,
          title: n.title,
          description: n.description,
          callToActionUrl: n.callToActionUrl,
          callToActionLabel: n.callToActionLabel,
          dismissible: n.dismissible,
          notificationStyle: this.type,
          importance: n.importance,
          color: n.color || '',
          icon: n.icon || '',
        }))
      return notifications
    },
  },
}
</script>

<style lang="scss" >

.asd20-notification-group {
  position: relative;
  .asd20-notification {
    transition: all 0.5s ease-in-out;
  }

  .notification-group-animation-enter {
    transform: scale(1.2);
    opacity: 0;
  }

  .notification-group-animation-leave-to {
    transform: scale(0.8);
    opacity: 0;
  }
  .notification-group-animation-leave-active {
    position: absolute;
    width: 100%;
  }
}

.asd20-notification-group--inline {
  .asd20-notification:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}

.asd20-notification-group--floating {
  position: fixed;
  z-index: 299;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  .asd20-notification {
    margin-bottom: 0.5rem;
  }
  .asd20-button {
    margin-left: auto;
    margin-bottom: 0.5rem;
    // right: space(0.5);
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.125);
  }
}

@media (min-width: 1024px) {
  .asd20-notification-group--floating {
    left: 70vw;
  }
}

.asd20-notification-group--status {
  position: relative;
  z-index: 299;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background: white;
  order: -2;
  // .asd20-notification {
  //   margin-bottom: space(0.5);
  // }
}

@media (min-width: 1024px) {
  .asd20-notification-group--status {
    position: absolute;
    order: inherit;
    left: auto;
    right: 2.5rem;
    background: transparent;
  }
}

.asd20-notification-group--sticky {
  position: absolute;
  z-index: 299;
  top: 0;
  left: 0;
  right: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  // .asd20-notification {
  //   margin-bottom: space(0.5);
  // }
  .asd20-button {
    margin-left: auto;
    margin-bottom: 0.5rem;
    // right: space(0.5);
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.125);
  }
}

@media (min-width: 1024px) {
  .asd20-notification-group--sticky {
    left: 70vw;
  }
}
</style>
