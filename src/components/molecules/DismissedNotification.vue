<template>
  <div>
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
