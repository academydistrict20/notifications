<template>
  <div>
    <p>
      <span v-if="dismissed > 0">{{ dismissed }}</span
      >{{ label }}
    </p>
    <asd20-icon :name="iconName" />
  </div>
</template>

<script>
import Asd20Icon from '@/components/atoms/Asd20Icon'
export default {
  name: 'DismissedNotification',
  components: {
    Asd20Icon
  },
  props: {
    iconName: {
      type: String,
      default: 'bell'
    },
    label: {
      type: String,
      default: 'Dismissed'
    },
    dismissed: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped></style>
