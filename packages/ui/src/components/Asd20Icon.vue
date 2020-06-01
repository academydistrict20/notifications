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
    <component :is="component"></component>
  </svg>
</template>

<script>
import camelCase from 'lodash-es/camelCase'
import alert from './icons/Asd20AlertSvg.vue'
import chevron from './icons/Asd20ChevronSvg.vue'
import danger from './icons/Asd20DangerSvg.vue'
import info from './icons/Asd20InfoSvg.vue'
import close from './icons/Asd20CloseSvg.vue'
import weatherSnow from './icons/Asd20WeatherSnowSvg.vue'
import weatherSun from './icons/Asd20WeatherSunSvg.vue'

const icons = {
  alert,
  chevron,
  danger,
  info,
  close,
  'weather-snow': weatherSnow,
  'weather-sun': weatherSun,
}

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
  computed: {
    component() {
      // let firstLetterUpperCase = this.name.charAt(0).toUpperCase()
      // let capitalizedName = `${firstLetterUpperCase}${camelCase(
      //   this.name
      // ).slice(1)}`
      // return () => import(`./icons/Asd20${capitalizedName}Svg`)
      return icons[this.name]
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
  }
}
</script>

<style lang="scss" >
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

.asd20-icon--xs {
  height: 16px;
  width: 16px;
}

.asd20-icon--sm {
  height: 24px;
  width: 24px;
}

.asd20-icon--md {
  height: 32px;
  width: 32px;
}

.asd20-icon--lg {
  height: 48px;
  width: 48px;
}

.asd20-icon--xl {
  height: 64px;
  width: 64px;
}
.asd20-icon--xxl {
  height: 128px;
  width: 128px;
}

</style>
