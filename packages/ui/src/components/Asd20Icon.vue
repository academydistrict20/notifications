<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    :aria-labelledby="labeledByPropRender"
    :class="classes"
    :aria-hidden="hidden"
    :style="cssVariables"
    :role="roleImg"
  >
    <title v-if="!hidden" :id="uniqueId" lang="en">{{ title }} icon</title>
    <component :is="iconTemplate"></component>
  </svg>
</template>

<script>
import camelCase from 'lodash-es/camelCase'
export default {
  props: {
    name: { type: String, default: 'search' },
    hidden: { type: Boolean, default: true },
    lineColor: { type: String, default: '' },
    fillColor: { type: String, default: '' },
    size: {
      type: String,
      default: 'lg',
      validator: value => {
        // The value must match one of these strings
        return ['xs', 'sm', 'md', 'lg'].indexOf(value) !== -1
      },
    },
  },
  data: () => ({
    iconTemplate: '',
  }),
  computed: {
    loader() {
      let firstLetterUpperCase = this.name.charAt(0).toUpperCase()
      let capitalizedName = `${firstLetterUpperCase}${camelCase(
        this.name
      ).slice(1)}`
      return () => import(`../../atoms/icons/Asd20${capitalizedName}Svg`)
    },
    cssVariables() {
      return { '--line-color': this.lineColor, '--fill-color': this.fillColor }
    },
    classes() {
      return ['asd20-icon', `asd20-icon--${this.size}`]
    },
    roleImg() {
      if (this.hidden === false) {
        // this.iconName = undefined
        return 'img'
      }
      return ''
    },
    title() {
      if (this.name.includes('-alt')) {
        return this.name.replace(/(-)\w+/, '')
      }
      return this.name
    },
    labeledByPropRender() {
      if (this.hidden === true) {
        return false
      }
      return this.uniqueId
    },
    uniqueId() {
      return `${this.name}-${this._uid}`
    },
  },
  mounted() {
    this.loader().then(() => {
      this.iconTemplate = () => this.loader()
    })
  },
}
</script>

<style lang="scss" scoped>
// @import '../../../design/_mixins.scss';
// @import '../../../design/_variables.scss';
$icon-sizes: (
  xs: 16px,
  sm: 24px,
  md: 32px,
  lg: 48px,
  xl: 64px,
  xxl: 128px,
);
.asd20-icon {
  --primary: #0e2c6c;
  --accent-one: #70b4c2;
  --line-color: #{var(--primary)};
  --fill-color: #{var(--accent-one)};
  g {
    fill: var(--fill-color);
    color: var(--line-color);
  }

  flex-shrink: 0;
}
@each $key, $val in $icon-sizes {
  .asd20-icon--#{$key} {
    height: $val;
    width: $val;
  }
}
</style>
