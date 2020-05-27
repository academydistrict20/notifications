<template>
  <transition name="asd20-badge">
    <div v-if="visible" :class="classes" class="asd20-badge">
      <div v-if="!!$slots.default || value" class="asd20-badge__content">
        {{ value }}
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Asd20Badge',
  props: {
    visible: { type: Boolean, default: true },
    value: { type: Number, default: 0 },
    left: { type: Boolean, default: false },
    static: { type: Boolean, default: false },
  },
  computed: {
    classes() {
      return {
        'asd20-badge--left': this.left,
        'asd20-badge--static': this.static,
        'asd20-badge--long': this.value >= 100,
      }
    },
  },
}
</script>

<style lang="scss" >
// @import '../../../design/_variables.scss';
// @import '../../../design/_mixins.scss';

.asd20-badge {
    --accent-one: #70b4c2;
  position: absolute;
  top: 0;
  right: 0;
  min-width: 0.5rem;
  min-height: 0.5rem;
  border-radius: 50%;
  background: var(--accent-one);
  font-family: 'montserrat', sans-serif;
  flex-shrink: 0;

  &--left {
    right: auto;
    left: 0;
  }
  &--static {
    position: relative;
    top: auto;
    left: auto;
  }

  &__content {
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    min-width: 0.75rem;
    min-height: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    line-height: 1;
    border-radius: 50%;
    overflow: hidden;
  }

  &--long {
    border-radius: 1rem;
    .asd20-badge__content {
      padding: 0 0.25rem;
    }
  }
}

.asd20-button .asd20-badge {
  top: 0.25rem;
  right: 0.25rem;
  &.asd20-badge--left {
    right: auto;
    left: 0.25rem;
  }
}

.asd20-badge-enter-active {
  transition: all 0.2s ease-out;
}
.asd20-badge-leave-active {
  transition: all 0.2s ease-out;
}
.asd20-badge-enter,
.asd20-badge-leave-to {
  transform: scale3d(0, 0, 0);
  opacity: 0;
}
</style>
