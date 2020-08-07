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
        v-if="description || detailLinkUrl" 
      >
        <span v-if="description" v-html="description"> </span> 
        <a v-if="detailLinkUrl" :href="detailLinkUrl">{{ detailLinkLabel || detailLinkUrl }} </a>
      </div>
      <asd20-button
        class="asd20-notification__cta"
        v-if="callToActionUrl"
        horizontal
        transparent
        bordered
        size="xs"
        :label="callToActionLabel || callToActionUrl"
        :link="callToActionUrl"
      ></asd20-button>
      <asd20-button
        class="asd20-notification__dismiss"
        v-if="dismissible && this.notificationStyle.toLowerCase() === 'floating'"
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
  name: 'asd20-notification',

  components: { Asd20Icon, Asd20Button },

  props: {
    id: { type: String, default: '' },
    title: { type: String, default: '' },
    icon: { type: String, default: '' },
    description: { type: String, default: '' },
    callToActionUrl: { type: String, default: '' },
    callToActionLabel: { type: String, default: '' },
    detailLinkUrl: { type: String, default: '' },
    detailLinkLabel: { type: String, default: '' },
    dismissible: { type: Boolean, default: false },
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
  --accent-dark: #4b757e;
  --emergency: #da2e0b;
  --warning: #B99C27;
  --warning-dark: #cfb02d;
  --normal: #4d7d36;
  // --warning-dark: #9b870c;

  position: relative;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  background: white;
  box-shadow: 0 0 0 1px var(--background-alt);
  color: #1e1e1e;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 1.0rem;
  a {
    color: #282828;
    // font-weight: 700;
  }

  &__content {
    display: flex;
    flex-direction: column;
    // align-self: center;
    margin-left: 0.5rem;
    padding-right: 1rem;
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
    position: absolute !important;
    top: 0;
    right: 0;
  }

  &__content > a.asd20-notification__cta {
    font-size: 0.875rem !important;
    margin-top: 0.5rem;
    padding: 0.5rem;
    // box-shadow: 0 -1px 0 0 var(--accent-one) inset !important;
  }

  &--emergency {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: var(--emergency);
      border-color: var(--emergency);

    }
    .asd20-icon {
      --line-color: var(--emergency);
      --fill-color: var(--background-color);
    }
    .asd20-notification__dismiss g {
      --line-color: var(--background-dark);
    }
    &.asd20-notification--banner {
      .asd20-notification__dismiss g {
        --line-color: white;
      }
    }
  }

  &--alert {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: var(--warning-dark);
      border-color: var(--warning-dark);
    }
    .asd20-icon {
      --line-color: var(--background-dark);
      --fill-color: var(--warning);
    }
  }

  &--status {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: var(--background-color);
    }
    .asd20-icon {
      --line-color: var(--background-dark);
      --fill-color: var(--background-color);
    }
  }

  &.asd20-notification--floating {
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.125);
    .asd20-notification__title {
      font-size: 1.125rem;
    }

    .asd20-notification__description {
      font-size: 0.875rem;
    }

    & > a.asd20-notification__cta {
      font-size: 0.875rem !important;
    }
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
      --line-color: var(--background-color);
      --fill-color: var(--background-color);
      .fill {
        opacity: 0.25;
      }
    }
    .asd20-notification__title {
      font-size: 0.875rem;
      color: var(--background-color);
      &::after {
        content: ': ';
      }
    }
    .asd20-notification__description {
      // font-size: 0.875rem;
      color: var(--background-color);
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

  &.asd20-notification--banner {
    padding: 0.5rem;
    background: var(--accent-dark);
    color: white;
    margin-bottom: 0;
    a {
      color: white;
    }
    .asd20-notification__title {
      font-size: 1.25rem;
    }
    .asd20-notification__title,
    .asd20-notification__cta {
      color: white;
      border-color: white !important;
    }
    .asd20-notification__dismiss .asd20-icon {
      --line-color: white;
      --fill-color: white;
    }
    .asd20-icon {
      --line-color: white;
      --fill-color: var(--accent-one);
    }
  }

  &--emergency.asd20-notification--banner {
    background: var(--emergency);
    color: white;
    a {
      color: white;
    }
    .asd20-notification__title,
    .asd20-notification__cta {
      color: white;
      border-color: white !important;
    }
    .asd20-icon {
      --line-color: var(--background-color);
      --fill-color: var(--emergency);
    }
  }
  &--alert.asd20-notification--banner {
    background: var(--warning-dark);
    color: white;
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
      --fill-color: var(--warning);
    }
  }

  // &--success.asd20-notification--banner {
  //   background: var(--success);
  //   color: white;
  //   .asd20-notification__title,
  //   .asd20-notification__cta {
  //     color: white;
  //   }
  //   .asd20-icon {
  //     --line-color: white;
  //     --fill-color: var(--success);
  //   }
  // }
}

@media (min-width: 1024px) {
  .asd20-notification {
    padding: 1.5rem !important;

    &__title {
      font-size: 1.25rem;
    }

    &__description {
      font-size: 1rem;
    }
    &__content > a.asd20-notification__cta {
      margin-top: 1rem;
    }
  }
}
</style>
