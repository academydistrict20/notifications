<template>
  <a
    v-if="!!link"
    :href="link || '#'"
    :class="classes"
    :aria-label="hideLabel ? label : false"
    :target="openNewWindow"
  >
    <asd20-icon
      v-if="icon"
      :name="icon"
      :size="size"
      :style="`transform: rotate(${iconAngle}deg)`"
    />
    <span
      v-if="(label && !hideLabel) || $slots.default"
      class="asd20-button__label"
      v-html="label"
    ></span>
    <slot />
  </a>
  <button v-else :class="classes" :aria-label="hideLabel ? label : ''">
    <asd20-icon
      v-if="icon"
      :name="icon"
      :size="size"
      :style="`transform: rotate(${iconAngle}deg)`"
    />
    <span
      v-if="(label && !hideLabel) || $slots.default"
      class="asd20-button__label"
      >{{ label }}</span
    >
    <!-- <asd20-badge v-if="badge" :value="badge" /> -->
    <slot />
  </button>
</template>

<script>
// import Asd20Badge from '../Asd20Badge'
import Asd20Icon from '../atoms/Asd20Icon'

export default {
  name: 'Asd20Button',
  components: { Asd20Icon },
  props: {
    label: { type: String, default: '' },
    hideLabel: { type: Boolean, default: false },
    link: { type: String, default: '' },
    icon: { type: String, default: '' },
    badge: { type: Number, default: 0 },
    size: {
      type: String,
      default: 'lg',
      validator: value => {
        // The value must match one of these strings
        return ['xs', 'sm', 'md', 'lg'].indexOf(value) !== -1
      }
    },
    textOnly: { type: Boolean, default: false },
    horizontal: { type: Boolean, default: false },
    transparent: { type: Boolean, default: false },
    expanded: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    reversed: { type: Boolean, default: false },
    centered: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    iconAngle: { type: Number, default: 0 }
  },
  computed: {
    classes() {
      return {
        'asd20-button': true,
        'asd20-button--text-only': this.textOnly,
        'asd20-button--horizontal': this.horizontal,
        'asd20-button--transparent': this.transparent,
        'asd20-button--expanded': this.expanded,
        'asd20-button--bordered': this.bordered,
        'asd20-button--reversed': this.reversed,
        'asd20-button--centered': this.centered,
        'asd20-button--disabled': this.disabled
      }
    },
    openNewWindow() {
      if (!this.link) return ''
      return this.link[0] === '/' || this.link.indexOf('asd20.org') > -1
        ? ''
        : '_blank'
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '../../../design/_variables.scss';
// @import '../../../design/_mixins.scss';

$sizes: (
  xs: space(1),
  sm: space(1.5),
  md: space(2.25),
  lg: space(3),
  xl: space(4)
);

// $button-border-width: var(--website-shape__line-thickness);
// $button-border-color: var(--color__accent);
// $button-background-color: var(--color__accent);
// $button-background-color-hover: var(--website-page__alternate-background-t40);
// $button-accent-color: var(--color__accent);
// $button-text-color: var(--color__primary);

// $button-reversed-border-color: var(--color__tertiary);
// $button-reversed-background-color: var(--color__primary);
// $button-reversed-background-color-hover: var(--color__primary-s20);
// $button-reversed-accent-color: var(--color__accent);
// $button-reversed-text-color: var(--color__accent-t100);

.asd20-button {
  border: none;
  padding: space(0.5);
  margin: 0;
  // text-transform: uppercase;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  position: relative;
  width: fit-content;
  cursor: pointer;

  // border-radius: var(--website-button__radius);
  // -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  // @include asd20-font(
  //   0.625,
  //   var(--website-typography__font-family-headlines),
  //   $weight: 700
  // );

  transition: background asd20-speed(1) ease-in-out;
}
// background: var(--website-button__background-color);
// color: var(--website-button__foreground-color);

//   use {
//     --line-color: #{$button-text-color};
//     --fill-color: #{$button-accent-color};
//   }

//   &:hover,
//   &:focus {
//     background: var(--website-button__hover-background-color);
//     color: var(--website-button__hover-foreground);
//     &::v-deep use {
//       --fill-color: var(--website-icon__hover-fill-color);
//     }
//   }
//   &:focus {
//     box-shadow: 0 0 0 var(--website-shape__line-thickness)
//       var(--website-page__link-color) inset;
//     outline: none;
//   }

//   &--horizontal {
//     flex-direction: row;
//     justify-content: flex-start;
//     text-align: center;
//     // text-align: left;
//     &::v-deep .asd20-button__label:not(:first-child) {
//       margin-left: space(0.25);
//     }
//   }
//   &--centered {
//     justify-content: center;
//   }
//   &--expanded {
//     width: auto;
//     flex-grow: 1;
//   }
//   &--bordered {
//     border: var(--website-button__border);
//   }
//   &--reversed {
//     background: var(--website-button__reverse-background-color);
//     color: var(--website-button__reverse-foreground-color);

//     &::v-deep g {
//       --line-color: var(--website-icon__line-color-reverse);
//       --fill-color: var(--website-icon__fill-color-reverse);
//     }

//     &:hover,
//     &:focus {
//       background: var(--website-button__hover-reverse-background-color);
//       color: var(--website-button__hover-reverse-foreground-color);
//       use {
//         --fill-color: var(--website-icon__hover-fill-color-reverse);
//       }
//     }
//     &:focus {
//       box-shadow: 0 0 0 var(--website-shape__line-thickness)
//         var(--website-page__link-color) inset;
//     }
//     &.asd20-button--transparent:hover,
//     &.asd20-button--transparent:focus {
//       background-color: rgba(black, 0.25);
//     }
//   }
//   &--transparent {
//     background: transparent;
//     color: var(--website-button__foreground-color);
//     &:hover {
//       // background: var(--website-page__alternate-background-color);
//       background: var(--website-button__hover-background-color);
//       color: var(--website-button__hover-foreground);
//     }
//     &:focus {
//       box-shadow: 0 0 0 5px var(--website-page__link-color) inset;
//       outline: none;
//       background: var(--website-page__alternate-background-color);
//     }
//   }

//   &--transparent.asd20-button--reversed {
//     background: transparent;
//     color: var(--website-button__reverse-foreground-color);
//   }
//   &--text-only {
//     padding: 0;
//     background: transparent;
//     box-shadow: none;
//     color: currentColor;

//     &:hover {
//       background: none;
//     }
//     &:focus {
//       box-shadow: 0 0 0 5px var(--website-page__link-color) inset;
//       outline: none;
//       background: none;
//     }
//   }
//   &--disabled {
//     opacity: 0.5;
//   }
// }

// @each $key, $val in $sizes {
//   .asd20-button--#{$key} {
//     height: $val;
//     width: $val;
//   }
// }
</style>
