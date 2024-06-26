<template>
  <div :class="classes" role="status" :style="{ '--background-color': this.color || 'currentColor' }">
    <asd20-icon v-if="iconName" :name="iconName" :size="iconSize"></asd20-icon>

    <div class="asd20-notification__content">
      <div class="asd20-notification__title" v-if="title" v-html="title"></div>
      <div class="asd20-notification__description" v-if="description || detailLinkUrl">
        <span v-if="description" v-html="description"> </span>
        <a v-if="detailLinkUrl" :tabindex="focusDisabled ? '-1' : undefined" :href="detailLinkUrl">{{
          detailLinkLabel || detailLinkUrl
        }}</a>
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
        :tabindex="focusDisabled ? '-1' : undefined"
      ></asd20-button>
      <asd20-button
        class="asd20-notification__dismiss"
        v-if="dismissible"
        transparent
        size="xs"
        icon="close"
        label="Dismiss"
        hide-label
        :tabindex="focusDisabled ? '-1' : undefined"
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
    color: { type: String, default: 'currentColor' },
    notificationStyle: { type: String, default: '' },
    importance: { type: String, default: 'info' },
    focusDisabled: { type: Boolean, default: false },
  },

  computed: {
    classes() {
      let classes = {
        'asd20-notification': true,
        'asd20-notification--banner': this.notificationStyle.toLowerCase() === 'banner',
        'asd20-notification--floating': this.notificationStyle.toLowerCase() === 'floating',
        'asd20-notification--inline': this.notificationStyle.toLowerCase() === 'inline',
        'asd20-notification--status': this.notificationStyle.toLowerCase() === 'status',
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
          return 'xl'
        default:
          return 'xl'
      }
    },
  },
}
</script>

<style lang="scss">
// @import '../../../design/_variables.scss';
// @import '../../../design/_mixins.scss';

.asd20-notification {
  --background-color: white;
  --background-alt: #e3e6e8;
  --background-dark: #000000;
  --primary: #0e2c6c;
  --accent-one: #70b4c2;
  --accent-dark: #4b757e;
  --emergency: #da2e0b;
  --warning: #dabf50;
  --warning-dark: #dabf50;
  --normal: #4d7d36;

  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: white;
  color: #1e1e1e;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  a {
    color: #282828;
  }
  .asd20-icon--xl {
    height: 48px;
    width: 48px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    border-top: 2px solid var(--accent-one);
  }

  &__title {
    font-weight: bold;
    font-size: 1.25rem;
    color: var(--primary);
  }

  &__description {
    font-size: 0.875rem;
    margin: 0.25rem 0 1rem 0;
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
    line-height: 1.1;
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
    .asd20-notification__content {
      border-top: 2px solid var(--emergency);
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
    .asd20-notification__content {
      border-top: 2px solid var(--warning-dark);
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
      padding-top: 0.5rem;
    }

    .asd20-notification__description {
      font-size: 0.875rem;
    }

    & > a.asd20-notification__cta {
      font-size: 0.875rem !important;
      line-height: 1.1;
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
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
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
      // color: var(--background-color);
      white-space: nowrap;
      &::after {
        content: ': ';
      }
    }
    .asd20-notification__description {
      font-size: 0.875rem;
      color: var(--background-color);
      margin: 0 0 0 0.25rem;
      white-space: nowrap;
    }
    .asd20-notification__dismiss {
      position: relative;
      padding: 0;
      display: none;
      // color: var(--background-color);
      box-shadow: none !important;
    }
    a.asd20-notification__cta {
      display: none;
    }
  }

  &.asd20-notification--inline {
    box-shadow: 0 0 0 5px var(--accent-one);
  }

  &.asd20-notification--banner {
    background: var(--background-dark);
    color: white;
    margin-bottom: 0;
    border-bottom: 30px solid var(--accent-one);
    border-left: none;
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
    background: var(--background-dark);
    color: white;
    border-bottom: 30px solid var(--emergency);
    border-left: none;
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
    background: var(--background-dark);
    color: white;
    border-bottom: 30px solid var(--warning-dark);
    border-left: none;
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
}
@media (min-width: 768px) {
  .asd20-notification {
    flex-direction: row;
    .asd20-icon--xl {
      height: 64px;
      width: 64px;
    }
    &__content {
      margin-top: .375rem;
      padding-left: 1rem;
      border-left: 2px solid var(--accent-one);
      border-top: none;
      padding-top: 0;
    }
    &--emergency {
      .asd20-notification__content {
        border-left: 2px solid var(--emergency);
        border-top: none;
      }
    }
    &--alert {
      .asd20-notification__content {
        border-left: 2px solid var(--warning-dark);
        border-top: none;
      }
    }
    &.asd20-notification--floating {
      flex-direction: column;
      .asd20-notification__content {
        border-top: 2px solid var(--emergency);
        border-left: none;
      }
    }
    &.asd20-notification--banner {
      border-left: 30px solid var(--accent-one);
      border-bottom: none;
    }
    &--emergency.asd20-notification--banner {
      border-left: 30px solid var(--emergency);
      border-bottom: none;
    }
    &--alert.asd20-notification--banner {
      border-left: 30px solid var(--warning-dark);
      border-bottom: none;
    }
  }
}


@media (min-width: 1024px) {
  .asd20-notification {
    &__title {
      font-size: 1.5rem;
    }

    &__description {
      font-size: 1rem;
      margin: 0.5rem 0 0 0;
    }
    &__content > a.asd20-notification__cta {
      margin-top: 1rem;
    }
  }
}
</style>
