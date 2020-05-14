<template>
  <div
    :class="classes"
    role="alert"
    :style="{ '--background-color': this.color }"
  >
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
        @click.native="$emit('dismiss')"
      />
      <slot />
    </div>
  </div>
</template>

<script>
import Asd20Icon from '../Asd20Icon'
import Asd20Button from '../Asd20Button'

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

<style lang="scss" scoped>
@import '../../../design/_variables.scss';
@import '../../../design/_mixins.scss';

.asd20-notification {
  --background-color: white;
  position: relative;
  display: flex;
  flex-direction: row;
  padding: space(0.5);
  background: white;
  box-shadow: 0 0 0 1px asd20-swatch('background-alt');
  color: asd20-swatch('background-dark');

  &__content {
    display: flex;
    flex-direction: column;
    align-self: center;
  }

  &__title {
    font-weight: bold;
    font-size: 1.0625rem;
    color: asd20-swatch('primary');
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
    box-shadow: 0 -1px 0 0 asd20-swatch('accent-one') inset !important;
  }

  & > .asd20-icon {
    margin-right: space(0.25);
  }

  &--emergency {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: asd20-swatch('emergency');
    }
    & > .asd20-icon {
      --line-color: #{asd20-swatch('emergency', -2)};
      --fill-color: #{asd20-swatch('emergency', 8)};
    }
  }

  &--alert {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: asd20-swatch('warning', -5);
    }
    & > .asd20-icon {
      --line-color: #{asd20-swatch('warning', -5)};
      --fill-color: #{asd20-swatch('warning', 8)};
    }
  }

  &--success {
    .asd20-notification__title,
    .asd20-notification__cta {
      color: asd20-swatch('success');
    }
    & > .asd20-icon {
      --line-color: #{asd20-swatch('success', -2)};
      --fill-color: #{asd20-swatch('success', 8)};
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

    // & /deep/ a.asd20-notification__cta {
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
      & /deep/ .fill {
        opacity: 0.25;
      }
    }
    .asd20-notification__title {
      font-size: 0.875rem;
      color: var(--background-color);
      &::after {
        content: ':';
      }
    }
    .asd20-notification__description {
      color: var(--background-color);
      margin: 0 0 0 space(0.25);
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
    --background-color: #{asd20-swatch('accent-one', -2)};
    padding: space(0.5);
    background: var(--background-color);
    color: white;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.125);

    &.asd20-notification--dismissible {
      transform: translateX(calc(100% - #{space(2.5)}));
      transition: transform 0.2s $anim-easing;
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
    & /deep/ a.asd20-notification__cta {
      color: white;
      box-shadow: 0 -1px 0 0 rgba(255, 255, 255, 0.5) inset !important;
    }
    & /deep/ .asd20-notification__dismiss .asd20-icon {
      --line-color: white;
      --fill-color: white;
    }
    & > .asd20-icon {
      --line-color: white;
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
    background: asd20-swatch('accent-one', -2);
  }
  &--emergency.asd20-notification--sticky {
    background: asd20-swatch('emergency');
  }
  &--alert.asd20-notification--sticky {
    background: asd20-swatch('warning');
    color: asd20-swatch('warning', -8);
    .asd20-notification__title {
      color: asd20-swatch('warning', -10);
    }
    & /deep/ a.asd20-notification__cta {
      color: asd20-swatch('warning', -10);
      box-shadow: 0 -1px 0 0 #{asd20-swatch('warning', -5)} inset !important;
    }
    .asd20-notification__dismiss .asd20-icon {
      --line-color: #{asd20-swatch('warning', -8)};
      --fill-color: #{asd20-swatch('warning', -8)};
    }

    & > .asd20-icon {
      --line-color: #{asd20-swatch('warning', -8)};
      --fill-color: #{asd20-swatch('warning', -2)};
    }
  }

  &--success.asd20-notification--sticky {
    background: asd20-swatch('success');
  }

  &.asd20-notification--banner {
    padding: space(0.5);
    background: asd20-swatch('accent-one', -3.5);
    color: white;
    .asd20-notification__title {
      font-size: 1.25rem;
    }
    .asd20-notification__title,
    .asd20-notification__cta {
      color: white;
    }
    & /deep/ .asd20-notification__dismiss .asd20-icon {
      --line-color: white;
      --fill-color: white;
    }
    & > .asd20-icon {
      --line-color: white;
      --fill-color: #{asd20-swatch('accent-one', -6)};
      margin-right: space(0.5);
    }
  }

  &--emergency.asd20-notification--banner {
    background: asd20-swatch('emergency');
    color: white;
    .asd20-notification__title,
    .asd20-notification__cta {
      color: white;
    }
    & > .asd20-icon {
      --line-color: white;
      --fill-color: #{asd20-swatch('emergency', -3)};
    }
  }
  &--alert.asd20-notification--banner {
    background: asd20-swatch('warning');
    color: asd20-swatch('warning', -8);
    .asd20-notification__title,
    .asd20-notification__cta {
      color: asd20-swatch('warning', -8);
    }
    .asd20-notification__dismiss .asd20-icon {
      --line-color: #{asd20-swatch('warning', -8)};
      --fill-color: #{asd20-swatch('warning', -8)};
    }

    & > .asd20-icon {
      --line-color: #{asd20-swatch('warning', -8)};
      --fill-color: #{asd20-swatch('warning', -2)};
    }
  }

  &--success.asd20-notification--banner {
    background: asd20-swatch('success');
    color: white;
    .asd20-notification__title,
    .asd20-notification__cta {
      color: white;
    }
    & > .asd20-icon {
      --line-color: white;
      --fill-color: #{asd20-swatch('success', -4)};
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
