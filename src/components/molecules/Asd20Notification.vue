<template>
  <div :class="classes" role="alert">
    <asd20-icon v-if="iconName" :name="iconName" :size="iconSize" />
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
      />
      <asd20-button
        class="asd20-notification__dismiss"
        v-if="dismissible"
        transparent
        size="xs"
        icon="close"
        label="Dismiss"
        hide-label
        @click.native="$emit('dismiss', id)"
      />
      <slot />
    </div>
  </div>
</template>

<script>
import Asd20Icon from '@/components/atoms/Asd20Icon'
import Asd20Button from '@/components/molecules/Asd20Button'

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
    importance: { type: String, default: 'info' }
  },

  computed: {
    classes() {
      let classes = {
        'asd20-notification': true,
        // 'asd20-notification--status':
        //   this.notificationStyle.toLowerCase() === 'status',
        'asd20-notification--dismissible': this.dismissible
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
    }
  }
}
</script>

<style lang="scss" scoped>
.asd20-notification {
  --website-page__background-color: purple;
  --background-color: var(--website-page__background-color);
  --color__tertiary: pink;
  --color__primary: blue;
  --color__danger: red;
  --color__warning: orange;
  --color__success: green;
  // position: relative;
  display: flex;
  flex-direction: row;
  // width: 100%;
  background: white;
  // align-content: center;
  align-items: flex-start;
  box-shadow: 0 0 0 1px var(--color__tertiary);
  color: var(--website-card__reverse-background-color);

  &__content {
    display: flex;
    flex-direction: column;
    // align-self: center;
  }

  &__title {
    font-weight: bold;
    font-size: 1.0625rem;
    color: var(--color__primary);
  }

  &__description {
    font-size: 0.875rem;
    margin-top: space(0.25);
  }

  &__dismiss {
    position: absolute;
    top: 0;
    right: 0;
  }

  &__content > a.asd20-notification__cta {
    font-size: 0.875rem !important;
    margin-top: space(0.25);
    padding: 0;
    box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.5) inset !important;
    border-radius: 0;
  }

  & > .asd20-icon {
    margin-right: space(0.25);
  }

  &--emergency {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: var(--color__danger);
    }
    & > .asd20-icon {
      --line-color: var(--color__danger);
      --fill-color: var(--color__danger);
    }
  }

  &--urgent {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: var(--color__warning);
    }
    & > .asd20-icon {
      --line-color: var(--color__warning);
      --fill-color: var(--color__warning);
    }
  }

  &--informational {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: var(--color__success);
    }
    & > .asd20-icon {
      --line-color: var(--color__success);
      --fill-color: var(--color__success);
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

    // &::v-deep a.asd20-notification__cta {
    //   font-size: 0.875rem !important;
    // }
  }

  &.asd20-notification--status {
    box-shadow: none;
    padding: space(0);
    background: transparent;
    .asd20-notification__content {
      display: flex;
      flex-direction: row;
      align-self: center;
      flex-wrap: none;
      align-items: center;
    }
    & > .asd20-icon {
      --line-color: var(--background-color);
      --fill-color: var(--background-color);
      &::v-deep .fill {
        opacity: 0.25;
      }
    }
    .asd20-notification__title {
      font-size: 0.75rem;
      color: var(--background-color);
      &::after {
        content: ':';
      }
    }
    .asd20-notification__description {
      color: var(--background-color);
      margin: 0 0 0 space(0.25);
      font-size: 0.75rem;
    }
    .asd20-notification__dismiss {
      position: relative;
      padding: 0;
      display: none;
      color: var(--background-color);
      box-shadow: none !important;
    }
  }

  &.asd20-notification--sticky {
    --background-color: var(--color__accent-s20);
    padding: space(0.5);
    background: var(--background-color);
    color: white;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.125);

    &.asd20-notification--dismissible {
      transform: translateX(calc(100% - #{space(2.5)}));
      transition: transform 0.2s ease-in;
      // $anim-easing;
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
    &::v-deep a.asd20-notification__cta {
      color: white;
      box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.5) inset !important;
    }
    &::v-deep .asd20-notification__dismiss .asd20-icon {
      --line-color: var(--website-page__background-color);
      --color: var(--website-page__foreground-color);
    }

    & > .asd20-icon {
      --line-color: var(--website-page__background-color);
      --fill-color: rgba(255, 255, 255, 0.25);
      // align-self: center;
      width: space(1.5);
      height: space(1.5);
      // outline: 1px solid red;
      margin-right: space(0.5);
      // margin-top: space(-0.25);
      // margin-left: space(-0.25);
    }
  }
  &--info.asd20-notification--sticky {
    background: var(--color__accent-s20);
  }
  &--emergency.asd20-notification--sticky {
    background: var(--color__danger);
  }
  &--alert.asd20-notification--sticky {
    background: var(--color__warning);
    color: var(--color__warning-s80);
    .asd20-notification__title {
      color: var(--color__warning-s100);
    }
    &::v-deep a.asd20-notification__cta {
      color: var(--color__warning-s100);
      box-shadow: 0 -1px 0 0 var(--color__warning-s50) inset !important;
    }
    .asd20-notification__dismiss .asd20-icon {
      --line-color: var(--color__warning-s80);
      --fill-color: var(--color__warning-s80);
    }

    & > .asd20-icon {
      --line-color: var(--color__warning-s80);
      --fill-color: var(--color__warning-s20);
    }
  }

  &--success.asd20-notification--sticky {
    background: var(--color__success);
  }

  &.asd20-notification--banner {
    padding: space(0.5);
    background: var(--color__accent-s30);
    color: white;
    .asd20-notification__title {
      font-size: 1.25rem;
    }
    .asd20-notification__title,
    .asd20-notification__cta {
      color: white;
    }
    &::v-deep .asd20-notification__dismiss .asd20-icon {
      --line-color: var(--website-page__background-color);
    }
    & > .asd20-icon {
      --line-color: var(--website-page__background-color);
      --fill-color: var(--color__accent-s60);
      margin-right: space(0.5);
    }
  }

  &--emergency.asd20-notification--banner {
    background: var(--color__danger);
    color: white;
    .asd20-notification__title,
    .asd20-notification__cta {
      color: white;
    }
    & > .asd20-icon {
      --line-color: var(--website-page__background-color);
      --fill-color: var(--color__danger-s30);
    }
  }
  &--alert.asd20-notification--banner {
    background: var(--color__warning);
    color: var(--color__warning-s80);
    .asd20-notification__title,
    .asd20-notification__cta {
      color: var(--color__warning-s80);
    }
    .asd20-notification__dismiss .asd20-icon {
      --line-color: var(--color__warning-s80);
      --fill-color: var(--color__warning-s80);
    }

    & > .asd20-icon {
      --line-color: var(--color__warning-s80);
      --fill-color: var(--color__warning-s20);
    }
  }

  &--success.asd20-notification--banner {
    background: var(--color__success);
    color: white;
    .asd20-notification__title,
    .asd20-notification__cta {
      color: white;
    }
    & > .asd20-icon {
      --line-color: var(--website-page__background-color);
      --fill-color: var(--color__success-s40);
    }
  }
}

@media (min-width: 1024px) {
  .asd20-notification {
    &.asd20-notification--status {
      .asd20-notification__title {
        font-size: 0.875rem;
      }
      .asd20-notification__description {
        font-size: 0.875rem;
      }
    }
    // &__title {
    //   font-size: 1.25rem;
    // }

    // &__description {
    //   font-size: 1rem;
    // }
  }
}
</style>
