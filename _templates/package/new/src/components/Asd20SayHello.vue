---
to: "<%= useVueComponents ? `packages/${h.changeCase.snake(pkg)}/src/components/Asd20SayHello.vue` : null %>"
---
<template>
  <strong>Hello {{name}}, I'm the <%= pkg %> package!</strong>
</template>

<script>
export default {
  name: 'Asd20SayHello',

  props: {
    name: { type: String, default: 'World' }
  }
}
</script>
