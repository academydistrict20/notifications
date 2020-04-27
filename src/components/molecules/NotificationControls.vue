<template>
  <div class="notification-controls">
    <button @click="decreaseValue">
      <asd20-icon name="chevron" size="sm" style="transform: rotate(-90deg)" />
    </button>
    <p>{{ number }} of {{ count }}</p>
    <button @click="increaseValue">
      <asd20-icon name="chevron" size="sm" style="transform: rotate(90deg)" />
    </button>
  </div>
</template>

<script>
import Asd20Icon from '@/components/atoms/Asd20Icon'
export default {
  name: 'NotificationControls',
  props: {
    number: {
      type: Number,
      default: 1
    },
    count: {
      type: Number,
      default: 0
    }
  },
  components: {
    Asd20Icon
  },
  methods: {
    decreaseValue() {
      this.$emit('decreaseValue')
    },
    increaseValue() {
      this.$emit('increaseValue')
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  // min-width: 180px;
  align-self: start;
  button {
    background: transparent;
    border: none;
  }
}
</style>
