<template>
  <strong>Hello {{name}}, I'm the ui package!</strong>
</template>

<script>
export default {
  name: 'Asd20SayHello',

  props: {
    name: { type: String, default: 'World' }
  }
}
</script>
