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
    <asd20-badge v-if="badge" :value="badge" />
    <slot />
  </button>
</template>

<script>
import Asd20Badge from '../Asd20Badge'
import Asd20Icon from '../Asd20Icon'

export default {
  name: 'Asd20Button',
  components: { Asd20Badge, Asd20Icon },
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
      },
    },
    textOnly: { type: Boolean, default: false },
    horizontal: { type: Boolean, default: false },
    transparent: { type: Boolean, default: false },
    expanded: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    reversed: { type: Boolean, default: false },
    centered: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    iconAngle: { type: Number, default: 0 },
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
        'asd20-button--disabled': this.disabled,
      }
    },
    openNewWindow() {
      if (!this.link) return ''
      return this.link[0] === '/' || this.link.indexOf('asd20.org') > -1
        ? ''
        : '_blank'
    },
  },
}
</script>

<style lang="scss" scoped>
// @import '../../../design/_variables.scss';
// @import '../../../design/_mixins.scss';

$sizes: (
  xs: 1rem,
  sm: 1.5rem,
  md: 2.25rem,
  lg: 3rem,
  xl: 4rem,
);


$button-border-width: 2px;
$button-border-color: var(--accent-one);
$button-background-color: var(--accent-one, 8);
$button-background-color-hover: var(--background-alt, 4);
$button-accent-color: var(--accent-one);
$button-text-color: var(--primary);

$button-reversed-border-color: var(--background-alt);
$button-reversed-background-color: var(--primary);
$button-reversed-background-color-hover: var(--primary, -2);
$button-reversed-accent-color: var(--accent-one);
$button-reversed-text-color: var(--accent-one, 10);

.asd20-button {
    --accent-one: #70b4c2;
    --background-color: white;
    --background-alt: #e3e6e8;
    --background-dark: #062137;
    --emergency: #da2e0b;
    --primary: #0e2c6c;
    --success: #4d7d36;
    --warning: #f7e06e;
  border: none;
  padding: 0.5rem;
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
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

//   @include asd20-font(0.625, $font-family-headlines, $weight: 700);
  font-family: 'montserrat', sans-serif;
  font-weight: 700;
  line-height: 0.625;

//   transition: background asd20-speed(1) ease-in-out;
  transition: background 0.2s ease-in-out;


  background: $button-background-color;
  color: $button-text-color;

  use {
    --line-color: #{$button-text-color};
    --fill-color: #{$button-accent-color};
  }

  &:hover,
  &:focus {
    background-color: $button-background-color-hover;
    & /deep/ use {
      --fill-color: #{$button-accent-color};
    }
  }
  &:focus {
    box-shadow: 0 0 0 2px $button-border-color inset;
    outline: none;
  }

  &--horizontal {
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
    // text-align: left;
    & /deep/ .asd20-button__label:not(:first-child) {
      margin-left: 0.25rem;
    }
  }
  &--centered {
    justify-content: center;
  }
  &--expanded {
    width: auto;
    flex-grow: 1;
  }
  &--bordered {
    border: $button-border-width solid $button-border-color;
  }
  &--reversed {
    background: $button-reversed-background-color;
    color: $button-reversed-text-color;

    & /deep/ g {
      --line-color: #{$button-reversed-border-color};
      --fill-color: #{$button-reversed-accent-color};
    }

    &.asd20-button--bordered {
      box-shadow: 0 0 0 $button-border-width $button-reversed-accent-color inset;
    }

    &:hover,
    &:focus {
      background-color: $button-reversed-background-color-hover;
      use {
        --fill-color: #{$button-reversed-accent-color};
      }
    }
    &:focus {
      box-shadow: 0 0 0 $button-border-width $button-reversed-border-color inset;
    }
    &.asd20-button--transparent:hover,
    &.asd20-button--transparent:focus {
      background-color: rgba(black, 0.25);
    }
  }
  &--transparent {
    background: transparent;
    &:hover {
      background: rgba(var(--background-alt), 0.5);
    }
    &:focus {
      box-shadow: 0 0 0 5px rgba(var(--accent-one), 0.25) inset;
      outline: none;
      background: rgba(var(--background-alt), 0.5);
    }
  }
  &--text-only {
    padding: 0;
    background: transparent;
    box-shadow: none;
    color: currentColor;

    &:hover {
      background: none;
    }
    &:focus {
      box-shadow: 0 0 0 5px rgba(var(--accent-one), 0.125) inset;
      outline: none;
      background: none;
    }
  }
  &--disabled {
    opacity: 0.5;
  }
}

@each $key, $val in $sizes {
  .asd20-button--#{$key} {
    height: $val;
    width: $val;
  }
}
</style>
