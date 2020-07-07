<template>
<!-- Can we delet this component? -->
  <div :class="classes">
    <transition-group
      v-if="isOpen && notificationsFromIndex.length > 0"
      class="notifications"
      name="notifications"
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass"
      tag="div"
    >
      <Notification
        v-for="notification of notificationsFromIndex"
        :key="notification.key || notification.title"
        v-bind="notification"
        :type="type"
      ></Notification>
    </transition-group>

    <button class="bell" @click="open = !open">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role>
        <g>
          <path d="M16 7a6 6 0 0 1 6 6v7H10v-7a6 6 0 0 1 6-6z" class="fill"></path>
          <path
            fill="currentColor"
            d="M16 4a1 1 0 0 1 1 1v1l.75.19A7 7 0 0 1 23 13v9h1v2H8v-2h1v-9a7 7 0 0 1 5.25-6.77L15 6V5a1 1 0 0 1 1-1m0-1a2 2 0 0 0-2 2v.26A8 8 0 0 0 8 13v8H7v4h18v-4h-1v-8a8 8 0 0 0-6-7.74V5a2 2 0 0 0-2-2z"
            class="line"
          ></path>
          <path fill="currentColor" d="M8 21h16v1H8zM18 24a4 4 0 0 1-8 0z" class="line"></path>
        </g>
      </svg>
      <span>{{ notifications.length }}</span>
    </button>

    <div v-if="showControls && isOpen" class="pagination">
      <button @click="previous">
        <svg style="width: 16px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.83 32.67l-9.17-9.17 9.17-9.17-2.83-2.83-12 12 12 12z"></path>
          <path d="M0-.5h48v48h-48z" fill="none"></path>
        </svg>
      </button>
      <span>{{ index + 1 }} of {{ notifications.length }}</span>
      <button @click="next">
        <svg style="width: 16px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z"></path>
          <path d="M0-.25h48v48h-48z" fill="none"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Notification from "./Notification.vue";

export default {
  name: "NotificationGroup",

  components: { Notification },

  props: {
    type: { type: String, default: "inline" },
    notifications: { type: Array, default: () => [] }
  },

  data() {
    return {
      index: 0,
      open: true,
      notificationsFromIndex: [],
      enterActiveClass: "stack-in",
      leaveActiveClass: "stack-out"
    };
  },

  computed: {
    classes() {
      return ["notification-group", `notification-group--${this.type}`];
    },
    showControls() {
      return this.notifications.length > 0;
    },
    isOpen() {
      return this.open || this.type !== "floating";
    }
  },
  created() {
    this.initNotifications();
  },

  watch: {
    notifications: function(value) {
      this.initNotifications(value);
    }
  },
  methods: {
    initNotifications(newNotifications) {
      this.notificationsFromIndex = (newNotifications || []).map(incomingNotification => {
        // First, figure out if the notification is new or not based on its id
        // Store either undefined (not found), or the old notification object (found)
        const existingNotification = this.notificationsFromIndex.find(o => o.id === incomingNotification.id)

        // If not found, return incoming notification, with new key
        // to trigger an enter animation
        if (!existingNotification) {
          return {
          ...incomingNotification,
          key: Math.random()
            .toString(36)
            .substr(2, 9)
          }
        // If it already was present, return new data,
        // but with same key, to avoid an enter animation
        } else {
          return {
            ...incomingNotification,
            key: existingNotification.key
          }
        }
      });
    },
    next() {
      const newIndex =
        this.index < this.notifications.length - 1 ? this.index + 1 : 0;

      const topItem = this.notificationsFromIndex[0];

      topItem.key = Math.random()
        .toString(36)
        .substr(2, 9);

      this.enterActiveClass = "";
      this.leaveActiveClass = "stack-out";

      // Remove top item
      this.notificationsFromIndex.splice(0, 1);

      // Add top item to bottom
      this.notificationsFromIndex.push(topItem);

      // Update the index
      this.index = newIndex;
    },
    previous() {
      this.enterActiveClass = "stack-in";
      this.leaveActiveClass = "fade-out";

      const notifications = this.notifications.map(n => ({
        ...n,
        key: this.notificationsFromIndex.find(n2 => n2.title === n.title).key
      }));
      const replacementIndex =
        this.index > 0 ? this.index - 1 : this.notifications.length - 1;

      const newItem = {
        ...notifications[replacementIndex],
        key: Math.random()
          .toString(36)
          .substr(2, 9)
      };

      // Remove old item
      notifications.splice(replacementIndex, 1);
      // Add top item to top
      notifications.unshift(newItem);

      this.notificationsFromIndex = notifications;

      // Update the index
      this.index = replacementIndex;
    }
  }
};
</script>

<style lang="scss">
.notification-group {
  position: relative;
  display: flex;
  flex-direction: column;

  &--inline {
    margin-bottom: 1rem;
  }

  .bell {
    display: none;
  }

  &--floating {
    z-index: 1000;
    flex-direction: row;
    margin-right: 0.25rem;
    align-items: center;
    justify-content: flex-end;
  }

  &--floating .bell {
    order: 2;
    position: relative;
    appearance: none;
    border: none;
    padding: none;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    color: black;
    font-size: 1rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.0625);
    border-radius: 50%;
    svg {
      width: 100%;
      height: 100%;
      color: hsl(0, 0%, 0%);
      fill: #80B3C0;
    }

    span {
      position: absolute;
      top: -0.5em;
      right: -0.5em;
      width: 1rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #80B3C0;
      color: white;
      font-size: 0.5rem;
      border-radius: 50%;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.75rem;
    button {
      appearance: none;
      background: transparent;
      padding: 0;
      border: 0;
      font-size: 1.5em;
      font-weight: bold;
      line-height: 0;
      width: 1rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  &--floating .pagination {
    margin-right: 0.25rem;
  }

  &--floating .notifications {
    flex-direction: column;
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    left: auto;
    max-width: 200px;
    display: flex;
  }
  &--floating .notification {
    transition: transform 0.5s;
    top: 0;
    transform: translateY(0) scale(1);

    &:first-child {
      z-index: 9;
    }

    @for $i from 2 through 10 {
      &:nth-child(#{$i}) {
        position: absolute;
        z-index: #{10 - $i};
        /* top: #{0.75 * ($i - 1)}rem; */
        transform: translateY(#{0.75 * ($i - 1)}rem)
          scale(#{1 - (($i - 1) * 0.05)});
      }
    }
  }
}
.fade-out-to {
  opacity: 0;
}

.stack-in {
  animation: stack-in 0.5s;
}

.stack-out {
  animation: stack-out 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes stack-in {
  0% {
    transform: translateX(0) translateY(1rem) scale(0.9);
    z-index: 0;
  }
  50% {
    transform: translateX(-100%) scale(0.95);
    z-index: 0;
  }
  51% {
    z-index: 9;
  }
  100% {
    transform: translateX(0) translateY(0) scale(1);
    z-index: 9;
  }
}

@keyframes stack-out {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-100%) scale(0.95);
    z-index: 9;
  }
  51% {
    z-index: 0;
  }
  100% {
    transform: translateX(0) translatey(1rem) scale(0.9);
    z-index: 0;
  }
}
</style>
