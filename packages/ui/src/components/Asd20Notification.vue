<template>
  <div
    :class="classes"
    role="alert"
    :style="{ '--background-color': this.color }"
  >
    <asd20-icon v-if="iconName" :name="iconName" :size="iconSize"></asd20-icon>
    <!-- <pre>{{ $props }}</pre> -->
    <!-- HELLO -->
    <div class="asd20-notification__content">
      <div class="asd20-notification__title" v-if="title" v-html="title"></div>
      <div
        class="asd20-notification__description"
        v-if="description"
        v-html="description"
      ></div>
      <asd20-button
        class="asd20-notification__cta"
        v-if="callToActionUrl"
        horizontal
        transparent
        size="xs"
        :label="callToActionLabel || callToActionUrl"
        :link="callToActionUrl"
      ></asd20-button>
      <asd20-button
        class="asd20-notification__dismiss"
        v-if="dismissible"
        transparent
        size="xs"
        icon="close"
        label="Dismiss"
        hide-label
        @click.native="$emit('dismiss')"
      ></asd20-button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Asd20Icon from './Asd20Icon.vue'
import Asd20Button from './Asd20Button.vue'

export default {
  name: 'Asd20Notification',

  components: { Asd20Icon, Asd20Button },

  props: {
    id: { type: String, default: '' },
    title: { type: String, default: '' },
    icon: { type: String, default: '' },
    description: { type: String, default: '' },
    callToActionUrl: { type: String, default: '' },
    callToActionLabel: { type: String, default: '' },
    dismissible: { type: Boolean, default: true },
    color: { type: String, default: 'inherit' },
    notificationStyle: { type: String, default: '' },
    importance: { type: String, default: 'info' },
  },

  computed: {
    classes() {
      let classes = {
        'asd20-notification': true,
        'asd20-notification--banner':
          this.notificationStyle.toLowerCase() === 'banner',
        'asd20-notification--floating':
          this.notificationStyle.toLowerCase() === 'floating',
        'asd20-notification--inline':
          this.notificationStyle.toLowerCase() === 'inline',
        'asd20-notification--sticky':
          this.notificationStyle.toLowerCase() === 'sticky',
        'asd20-notification--status':
          this.notificationStyle.toLowerCase() === 'status',
        'asd20-notification--dismissible': this.dismissible,
      }

      if (this.importance && (!this.color || this.color === 'inherit')) {
        classes[`asd20-notification--${this.importance.toLowerCase()}`] = true
      }

      return classes
    },
    iconName() {
      if (this.icon) return this.icon
      switch (this.importance.toLowerCase()) {
        case 'emergency':
          return 'danger'
        case 'alert':
          return 'alert'
        default:
          return 'info'
      }
    },
    iconSize() {
      switch (this.notificationStyle.toLowerCase()) {
        case 'banner':
          return 'md'
        case 'sticky':
          return 'lg'
        default:
          return 'sm'
      }
    },
  },
}
</script>

<style lang="scss" >
// @import '../../../design/_variables.scss';
// @import '../../../design/_mixins.scss';

.asd20-notification {
  --background-color: white;
  --background-alt: #e3e6e8;
  --background-dark: #062137;
  --primary: #0e2c6c;
  --accent-one: #70b4c2;
  --emergency: #da2e0b;
  --warning: #f7e06e;
  --success: #4d7d36;

  position: relative;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  background: white;
  box-shadow: 0 0 0 1px var(--background-alt);
  color: var(--background-dark);

  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;

  &__content {
    display: flex;
    flex-direction: column;
    align-self: center;
    padding: 0 0.5rem;
  }

  &__title {
    font-weight: bold;
    font-size: 1.0625rem;
    color: var(--primary);
  }

  &__description {
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  &__dismiss {
    position: absolute;
    top: 0;
    right: 0;
  }

  &__content > a.asd20-notification__cta {
    font-size: 0.875rem !important;
    margin-top: 0.5rem;
    padding: 0.5rem 0;
    // box-shadow: 0 -1px 0 0 var(--accent-one) inset !important;
  }

  .asd20-icon {
    margin-right: 0.25rem;
  }

  &--emergency {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: var(--emergency);
    }
    .asd20-icon {
      --line-color: #{var(--emergency, -2)};
      --fill-color: #{var(--background-color)};
    }
  }

  &--alert {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: var(--background-dark);
    }
    .asd20-icon {
      --line-color: var(--background-dark);
      --fill-color: var(--warning);
    }
  }

  &--success {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: var(--success);
    }
    .asd20-icon {
      --line-color: var(--background-dark);
      --fill-color: var(--success);
    }
  }

  &.asd20-notification--floating {
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.125);
    // .asd20-notification__title {
    //   font-size: 1.125rem;
    // }

    // .asd20-notification__description {
    //   font-size: 0.875rem;
    // }

    // & > a.asd20-notification__cta {
    //   font-size: 0.875rem !important;
    // }
  }

  &.asd20-notification--status {
    box-shadow: none;
    padding: 0;
    background: transparent;
    .asd20-notification__content {
      display: flex;
      flex-direction: row;
      align-self: center;
      flex-wrap: none;
      align-items: center;
    }
    .asd20-icon {
      --line-color: var(--background-dark);
      --fill-color: var(--background-dark);
      .fill {
        opacity: 0.25;
      }
    }
    .asd20-notification__title {
      font-size: 0.875rem;
      color: var(--background-dark);
      &::after {
        content: ': ';
      }
    }
    .asd20-notification__description {
      color: var(--background-dark);
      margin: 0 0 0 0.25rem;
    }
    .asd20-notification__dismiss {
      position: relative;
      padding: 0;
      display: none;
      color: var(--background-color);
      box-shadow: none !important;
    }
    a.asd20-notification__cta {
      display: none;
    }
  }

  &.asd20-notification--sticky {
    --background-color: #{var(--accent-one, -2)};
    padding: 0.5rem;
    background: var(--background-color);
    color: white;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.125);

    &.asd20-notification--dismissible {
      transform: translateX(calc(100% - #{2.5rem}));
      transition: transform 0.2s ease-in-out;
      &:hover {
        transform: translateX(0);
      }
    }
    .asd20-notification__title {
      // font-size: 1.25rem;
      color: white;
    }
    .asd20-notification__dismiss {
      display: none;
    }
    a.asd20-notification__cta {
      color: white;
      box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.5) inset !important;
    }
    .asd20-notification__dismiss .asd20-icon {
      --line-color: white;
      --fill-color: white;
    }
    .asd20-icon {
      --line-color: white;
      --fill-color: rgba(255, 255, 255, 0.25);
      // align-self: center;
      width: 1.5rem;
      height: 1.5rem;
      // outline: 1px solid red;
      margin-right: 0.5rem;
      // margin-top: space(-0.25);
      // margin-left: space(-0.25);
    }
  }
  &--info.asd20-notification--sticky {
    background: var(--accent-one);
  }
  &--emergency.asd20-notification--sticky {
    background: var(--emergency);
  }
  &--alert.asd20-notification--sticky {
    background: var(--warning);
    color: var(--warning);
    .asd20-notification__title {
      color: var(--warning);
    }
    a.asd20-notification__cta {
      color: var(--warning);
      box-shadow: 0 -1px 0 0 #{var(--warning)} inset !important;
    }
    .asd20-notification__dismiss .asd20-icon {
      --line-color: var(--warning);
      --fill-color: var(--warning);
    }

    .asd20-icon {
      --line-color: var(--warning);
      --fill-color: var(--warning);
    }
  }

  &--success.asd20-notification--sticky {
    background: var(--success);
  }

  &.asd20-notification--banner {
    padding: 0.5rem;
    background: var(--accent-one);
    color: white;
    .asd20-notification__title {
      font-size: 1.25rem;
    }
    .asd20-notification__title,
    .asd20-notification__cta {
      color: white;
    }
    .asd20-notification__dismiss .asd20-icon {
      --line-color: white;
      --fill-color: white;
    }
    .asd20-icon {
      --line-color: white;
      --fill-color: var(--accent-one);
      margin-right: 0.5rem;
    }
  }

  &--emergency.asd20-notification--banner {
    background: var(--emergency);
    color: white;
    .asd20-notification__title,
    .asd20-notification__cta {
      color: white;
    }
    .asd20-icon {
      --line-color: var(--background-color);
      --fill-color: var(--emergency);
    }
  }
  &--alert.asd20-notification--banner {
    background: var(--warning);
    color: var(--background-dark);
    .asd20-notification__title,
    .asd20-notification__cta {
      color: var(--background-dark);
    }
    .asd20-notification__dismiss .asd20-icon {
      --line-color: var(--background-dark);
      --fill-color: var(--background-dark);
    }

    .asd20-icon {
      --line-color: var(--background-dark);
      --fill-color: var(--warning);
    }
  }

  &--success.asd20-notification--banner {
    background: var(--success);
    color: white;
    .asd20-notification__title,
    .asd20-notification__cta {
      color: white;
    }
    .asd20-icon {
      --line-color: white;
      --fill-color: var(--success);
    }
  }
}

// @media (min-width: 1024px) {
//   .asd20-notification {
//     &__title {
//       font-size: 1.25rem;
//     }

//     &__description {
//       font-size: 1rem;
//     }
//   }
// }
</style>
