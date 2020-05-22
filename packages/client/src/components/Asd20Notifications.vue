<template>
  <strong>Hello , I'm the client package!</strong>
</template>

<script>
import operations from '../../../shared/src/mixins/operations'
export default {

  name: 'Asd20Notifications',
  mixins: [
    operations
  ],

  props: {
    // name: { type: String, default: 'World' }
  }, 
  methods:{

  }
}
</script>
