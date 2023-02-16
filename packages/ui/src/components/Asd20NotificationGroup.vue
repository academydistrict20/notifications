<template>
  <div :class="classes" v-show="totalDismissedNotifications || notifications.length > 0">
    <!-- v-show is SSR compatible -->
    <transition name="cards">
      <transition-group
        v-if="notificationsFromIndex.length > 0"
        class="notifications"
        name="notifications"
        :enter-active-class="enterActiveClass"
        :leave-active-class="leaveActiveClass"
        tag="div"
      >
        <asd20-notification
          class="notification"
          v-for="(notification, index) of notificationsFromIndex"
          :key="notification.key || notification.title"
          v-bind="notification"
          :notificationStyle="groupType"
          :aria-hidden="index ? true : undefined"
          :focus-disabled="index ? true : false"
          @dismiss="$emit('dismiss', notification)"
        >
        </asd20-notification>
      </transition-group>
    </transition>

    <button 
      v-if="groupType === 'floating'" 
      class="bell" 
      :class="{ 'open': open }"
      :title="totalDismissedNotifications ? 'Dismiss all notifications' : 'Show all notifications'" 
      @click="$emit('toggle-all')">
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
      <span aria-hidden="true">{{ totalDismissedNotifications }}</span>
    </button>

    <div v-if="showControls && notificationsFromIndex.length > 1" class="pagination">
      <button
        :title="prevTitle"
        @click="previous">
        <svg style="width: 16px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.83 32.67l-9.17-9.17 9.17-9.17-2.83-2.83-12 12 12 12z"></path>
          <path d="M0-.5h48v48h-48z" fill="none"></path>
        </svg>
      </button>
      <span>{{ index + 1 }} of {{ notificationsFromIndex.length }}</span>
      <button 
        :title="nextTitle"
        @click="next">
        <svg style="width: 16px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.17 32.92l9.17-9.17-9.17-9.17 2.83-2.83 12 12-12 12z"></path>
          <path d="M0-.25h48v48h-48z" fill="none"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import Asd20Notification from './Asd20Notification.vue'

export default {
  name: "asd20-notification-group",

  components: { Asd20Notification },

  props: {
    groupType: { type: String, default: "default" },
    position: { type: String, default: "static" },
    notifications: { type: Array, default: () => [] },
    totalDismissedNotifications: { type: Number, default: 0 },
  },

  data() {
    return {
      index: 0,
      open: true,
      notificationsFromIndex: [],
      enterActiveClass: "fade-in",
      leaveActiveClass: "fade-out"
    };
  },

  computed: {
    classes() {
      return ["notification-group", `notification-group--${this.groupType}`, `notification-group--${this.position}`];
    },
    showControls() {
      return this.notifications.length > 1;
    },
    nextTitle () {
      return `Go to notification ${this.index + 1 > this.notificationsFromIndex.length -1 ? 1 : this.index + 2} of ${this.notificationsFromIndex.length}`
    },
    prevTitle () {
      return `Go to notification ${this.index -1 < 0 ? this.notificationsFromIndex.length : this.index} of ${this.notificationsFromIndex.length}`
    }
  },
  created() {
    this.initNotifications(this.notifications);
  },

  watch: {
    notifications: function(value) {
      this.initNotifications(value);
    }
  },
  methods: {
     initNotifications(incomingNotifications) {
      // filter out old notifications that are no longer present in incoming notifications
      this.notificationsFromIndex = this.notificationsFromIndex.filter(n => incomingNotifications.find(n2 => n2.id === n.id))
      // take care of notifications that did not previously exist and give them a key
      const newNotifications = incomingNotifications
        .filter(n => !this.notificationsFromIndex.find(n2 => n2.id === n.id))
        .map(newN => ({
          ...newN, 
          key: Math.random().toString(36).substr(2, 9),
          ariaHidden: true
        }))
      // take care of notifications that match and keep their existing key value to prevent animations from occurring
      for(const [oldIndex, oldNotification] of Object.entries(this.notificationsFromIndex)){
        const matchingUpdatedNotification = (incomingNotifications || []).find(n => n.id === oldNotification.id)
        if(matchingUpdatedNotification) {
          this.notificationsFromIndex[oldIndex] = {
            ...matchingUpdatedNotification,
            key: this.notificationsFromIndex[oldIndex].key
          }
        }
      }
      // put new notifications at the beginning of the array
      this.notificationsFromIndex = newNotifications.concat(this.notificationsFromIndex)
      // if(this.index > this.notificationsFromIndex.length -1 )
      if(newNotifications.length > 0 || this.notificationsFromIndex.length > incomingNotifications.length || this.index > this.notificationsFromIndex.length -1 ){
        this.index = 0
      }
    },
    next() {
      const newIndex =
        this.index < this.notifications.length - 1 ? this.index + 1 : 0;

      const topItem = this.notificationsFromIndex[0];

      topItem.key = Math.random()
        .toString(36)
        .substr(2, 9);
      
      if (this.groupType === "banner") {
        this.enterActiveClass = "";
        this.leaveActiveClass = "slide-up";
      } else {
        this.enterActiveClass = "";
        this.leaveActiveClass = "stack-out";
      }

      // Remove top item
      this.notificationsFromIndex.splice(0, 1);

      // Add top item to bottom
      this.notificationsFromIndex.push(topItem);

      // Update the index
      this.index = newIndex;
    },
    previous() {
      if (this.groupType === "banner") {
        this.enterActiveClass = "slide-down";
        this.leaveActiveClass = "slide-up";
      } else {
        this.enterActiveClass = "stack-in";
        this.leaveActiveClass = "fade-out";
      }

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

  .bell {
    display: none;
  }
  
  &--banner {
    width: 100%;
  }

  &--floating {
    z-index: 1000;
    flex-direction: row;
    margin-right: 0.25rem;
    align-items: flex-start;
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
    z-index:9;
    cursor: pointer;

    &.open {
      box-shadow: none;
    }

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
    z-index: 15;

    font-family: sans-serif;

    button {
      appearance: none;
      background: transparent;
      padding: 0;
      border: none;
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 0;
      width: 1rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      outline: none;
      border-radius: 100%;
      background: rgba(0,0,0, 0.125);
      &:focus {
        box-shadow: 0 0 0 3px white, 0 0 10px 0 #477e88;
        outline: 3px solid #477e88;
        outline-offset: 7px;
      }
    }
    span {
      margin: 0 0.25rem;
    }
  }

  &--floating .pagination {
    margin-right: 0.5rem;
    background: rgba(255,255,255,0.85);
    align-self: stretch;
    margin-right: -2rem;
    // z-index: -1;
    z-index: 8;
    padding-right: 2rem;
    padding-left: 0.5rem;
    border-radius: 1rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.0625);

  }

  &--floating .notifications {
    flex-direction: column;
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    left: auto;
    display: flex;
  }
  &--floating .notification {
    transition: all 0.5s;
    top: 0;
    transform: translateY(0) scale(1);
    min-width: 300px;
    &:first-child {
      z-index: 9;
      .asd20-notification__content, g {
        transition: all 0.5s;
        opacity: 1;
        align-self: initial !important;
      }
    }

    @for $i from 2 through 10 {
      &:nth-child(#{$i}) {
        transition: all 0.5s;
        position: absolute;
        z-index: #{10 - $i};
        bottom: -0.125rem;
        // height: 87%;
        overflow-y: hidden;
        transform: translateY(#{0.75 * ($i - 1)}rem)
          scale(#{1 - (($i - 1) * 0.05)});
        .asd20-notification__content, g {
          transition: all 0.5s;
          opacity: 0.5;
        }
      }
    }
  }
  
  &--floating.notification-group--bottom-left .notifications {
    top: auto;
    bottom: calc(100% + .5rem);
    left: 0;
    right: auto;
  }

  &--floating.notification-group--bottom-right .notifications {
    top: auto;
    bottom: calc(100% + .5rem);
  }

  &--floating.notification-group--top-left .notifications {
    left: 0;
    right: auto;
  }
  
  
  &--bottom-right {
    position: fixed;
    bottom: .5rem;
    right: .5rem;
  }

  &--top-right {
    position: fixed;
    top: .5rem;
    right: .5rem;
  }

    
  &--bottom-left {
    position: fixed;
    bottom: .5rem;
    left: .5rem;
  }

   &--top-left {
    position: fixed;
    top: .5rem;
    left: .5rem;
  }

  &--banner .pagination {
    position: absolute;
    z-index: 100;
    right: 0.5rem;
    bottom: 0.5rem;
    color: white;
    button {
      fill: white;
    }
  }
  &--banner .notifications {
    // flex-direction: column;
    // position: absolute;
    // top: calc(100% + 0.5rem);
    // right: 0;
    // left: auto;
    // width: 100%;
    // display: flex;
  }
  &--banner .notification {
    transition: all 0.25s;
    top: 0;
    // width: 100%;
    transform: translateY(0);
    opacity: 1;
    &:first-child {
      z-index: 9;
    }

    @for $j from 2 through 10 {
      &:nth-child(#{$j}) {
        position: absolute;
        z-index: #{10 - $j};
        opacity: 0;
        transform: translateY(-100%);
      }
    }
  }

  &--inline .pagination {
    display: none;
  }

  &--inline .notification:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  &--status .pagination {
    display: none;
  }

  &--status .notifications {
    position: relative;
    z-index: 299;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    order: -2;
    background: white;
  }
}

.cards-enter-active {
  animation: swoop-in 0.5s;
}
.cards-leave-active {
  animation: swoop-in 0.5s reverse;
}

.notification-group--top-left .cards-enter-active,
.notification-group--top-left .cards-leave-active {
  transform-origin: top left;
}

.notification-group--static .cards-enter-active,
.notification-group--static .cards-leave-active,
.notification-group--top-right .cards-enter-active,
.notification-group--top-right .cards-leave-active {
  transform-origin: top right;
}

.notification-group--bottom-right .cards-enter-active,
.notification-group--bottom-right .cards-leave-active {
  transform-origin: bottom right;
}

.notification-group--bottom-left .cards-enter-active,
.notification-group--bottom-left .cards-leave-active {
  transform-origin: bottom left;
}

.fade-out-to {
  opacity: 0;
}

.stack-in {
  animation: stack-in 0.5s;
}

.stack-out {
  animation: stack-in 0.5s reverse;
}

.slide-up {
  animation: slide-up 0.25s;
}

.slide-down {
  animation: slide-down 0.5s;
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
    z-index: 9;
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

@keyframes slide-up {
  0% {
    transform: translateX(0) translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateX(0) translateY(-100%);
    opacity: 0;
  }
}

@keyframes slide-down {
  0% {
    transform: translateX(0) translateY(-100%);
    opacity: 0;
    width: 100%;
  }
  50% {
    transform: translateX(0) translateY(-100%);
    opacity: 0;
    width: 100%;
  }
  100% {
    transform: translateX(0) translateY(0);
    opacity: 1;
    width: 100%;
  }
}

@keyframes swoop-in {
  0% {
    transform: scale(0.0);
    opacity: 0;
  }
  100% {
    transform: scale(1.0);
    opacity: 1;
  }
}
</style>
